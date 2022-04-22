<template>
  <div class="pagebox">
    <br />
    <div class="outside">
      <el-date-picker
        class="inside"
        v-model="datevalue"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        @change="searchContract"
      >
      </el-date-picker>
      <el-select
        clearable
        class="inside"
        v-model="typevalue"
        filterable
        placeholder="合同类型"
        @change="searchContract"
        @clear="searchContract"
      >
        <el-option v-for="item in type" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select
        clearable
        class="inside"
        v-model="conditionvalue"
        filterable
        placeholder="合同状态"
        @clear="searchContract"
        @change="searchContract"
      >
        <el-option
          v-for="item in condition"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-input
        class="inside"
        v-model="nameorcode"
        clearable=""
        placeholder="合同编号或名称"
        prefix-icon="el-icon-search"
        @change="searchContract"
      ></el-input>
      <button class="inside" @click="searchContract">搜 索</button>
      <button class="inside el-icon-plus" @click="showdialog1 = true">
        新增合同
      </button>
    </div>

    <ul class="amount">
      <li v-for="(item, index) in info" :key="index">
        <img src="~@/assets/amountimg.png" class="amountimg" />
        <span>{{ item.amount }} 万元</span>
        <span>{{ item.label }}</span>
      </li>
    </ul>

    <el-table
      :data="tableDataTemp"
      border
      style="width: 98%; margin: 0 auto"
      :header-cell-style="{
        background: 'rgb(180,190,200)',
        fontSize: '12px',
        color: 'rgb(66,66,66)',
        textAlign: 'center',
      }"
      :cell-style="{ fontSize: '10px' }"
    >
      <el-table-column type="index" label="序号" min-width="30">
      </el-table-column>
      <el-table-column prop="code" label="合同编号" min-width="70">
      </el-table-column>
      <el-table-column prop="date1" label="签订日期" min-width="85">
      </el-table-column>
      <el-table-column prop="name" label="合同名称" min-width="150">
      </el-table-column>
      <el-table-column prop="type" label="合同类型" min-width="85">
      </el-table-column>
      <el-table-column prop="party" label="合同当事人" min-width="120">
      </el-table-column>
      <el-table-column prop="obj" label="合同标的" min-width="130">
      </el-table-column>
      <el-table-column
        prop="date2"
        label="生效日期"
        min-width="85"
      ></el-table-column>
      <el-table-column prop="total" label="总价款(万元)" min-width="70">
      </el-table-column>
      <el-table-column prop="expenses" label="开累收支(万元)" min-width="70">
      </el-table-column>
      <el-table-column prop="condition" label="合同状态" min-width="70">
      </el-table-column>
      <el-table-column prop="address" label="操作" width="240" class="btns">
        <template slot-scope="scope">
          <button @click="edit(scope.$index)">编辑</button>
          <button @click="editout(scope.$index, scope.row)">删除</button>
          <button class="el-icon-top" @click="moveup(scope.$index, scope.row)">
            上移
          </button>
          <button
            class="el-icon-bottom"
            @click="movedown(scope.$index, scope.row)"
          >
            下移
          </button>
        </template>
      </el-table-column>
    </el-table>
    <AddContract
      :dialogVisible="showdialog1"
      @done="addDone"
      @sumbitAdd="sumbitAdd"
      :type="type"
      :condition="condition"
    ></AddContract>
    <EditContract
      :dialogVisible="showdialog2"
      @done="editDone"
      :contractInfo="contractInfo"
      @submitEdit="submitEdit"
      :type="type"
      :condition="condition"
    ></EditContract>
  </div>
</template>

<script>
import axios from "axios";
import AddContract from "@/components/Dialogs/AddContract";
import EditContract from "@/components/Dialogs/EditContract";
export default {
  name: "PageOne",
  components: { AddContract, EditContract },
  data() {
    return {
      datevalue: "",
      typevalue: "",
      conditionvalue: "",
      nameorcode: "",
      type: [],
      condition: [],
      info: [
        {
          amount: 0,
          label: "合同总金额",
        },
        {
          amount: 0,
          label: "合同开累总支出",
        },
        {
          amount: 0,
          label: "已完成合同总金额",
        },
        {
          amount: 0,
          label: "未完成总金额",
        },
      ],
      tableData: [],
      tableDataTemp: [],
      showdialog1: false,
      showdialog2: false,
      contractInfo: {},
    };
  },
  computed: {
    search() {
      const { datevalue, typevalue, conditionvalue, nameorcode } = this;
      return { datevalue, typevalue, conditionvalue, nameorcode };
    },
  },
  watch: {
    tableDataTemp(newV) {
      let amount0 = 0;
      let amount1 = 0;
      let amount2 = 0;
      let amount3 = 0;
      newV.forEach((element) => {
        amount0 = amount0 + element.total;
        amount1 = amount1 + element.expenses;
        if (element.condition == "已完成") {
          amount2 = amount2 + element.total;
        } else {
          amount3 = amount3 + element.total;
        }
      });
      this.info[0].amount = amount0;
      this.info[1].amount = amount1;
      this.info[2].amount = amount2;
      this.info[3].amount = amount3;
    },
  },
  mounted() {
    console.log("这是page1页面");
    axios.get("/jsonfiles/contractconent.json").then((res) => {
      this.type = res.data.type;
      this.condition = res.data.condition;
    });
    axios.get("/jsonfiles/contracts.json").then((res) => {
      this.tableData = res.data.list;
      this.tableDataTemp = res.data.list;
    });
  },
  methods: {
    searchContract() {
      //作为更新datatemp的回调，进而渲染table
      if (
        this.search.datevalue ||
        this.search.typevalue ||
        this.search.conditionvalue ||
        this.search.nameorcode
      ) {
        this.tableDataTemp = this.tableData.filter((ele) => {
          var a1 = true; //验证日期
          var a2 = true; //验证类型
          var a3 = true; //验证状态
          var a4 = true; //验证输入框内容
          if (this.search.datevalue == "" || this.search.datevalue == null)
            a1 = true;
          else {
            if (ele.date1 == this.search.datevalue) a1 = true;
            else a1 = false;
          }
          if (this.search.typevalue == "") a2 = true;
          else {
            if (ele.type == this.search.typevalue) a2 = true;
            else a2 = false;
          }
          if (this.search.conditionvalue == "") a3 = true;
          else {
            if (ele.condition == this.search.conditionvalue) a3 = true;
            else a3 = false;
          }
          if (this.search.nameorcode == "") a4 = true;
          else {
            if (
              ele.code == this.search.nameorcode ||
              ele.name == this.search.nameorcode
            )
              a4 = true;
            else a4 = false;
          }
          return a1 && a2 && a3 && a4;
        });
      } else {
        console.log("四大皆空");
        this.tableDataTemp = this.tableData;
      }
    },
    sumbitAdd(contract) {
      this.tableData.push(contract);
      this.searchContract();
    },
    submitEdit(x) {
      console.log("submitEdit(x)", x);
      this.tableData.forEach((e, i) => {
        if (e.code == x.code) {
          console.log("i", i);
          this.tableData[i] = x;
        }
      });
      this.searchContract();
      this.showdialog2 = false;
    },
    addDone() {
      this.showdialog1 = false;
    },
    editDone() {
      this.showdialog2 = false;
    },
    moveup(index, row) {
      //移动涉及到了筛选条件干扰的问题，因此既要移动到dataTemp的上一个，又要移动到data中现上一个的实际位置的前边。
      //即temp中前进1步，但实际可能前进多步
      if (index == 0) {
        this.$message({
          message: "不能再上移了",
          type: "warning",
        });
        return;
      }
      let a = this.tableDataTemp[index - 1];
      let ifront, iback;
      this.tableData.forEach((ele, index) => {
        if (ele.code == a.code) ifront = index;
        if (ele.code == row.code) iback = index;
      });
      this.tableData.splice(iback, 1);
      this.tableData.splice(ifront, 0, row);
      this.searchContract();
    },
    movedown(index, row) {
      if (index == this.tableDataTemp.length - 1) {
        this.$message({
          message: "不能再下移了",
          type: "warning",
        });
        return;
      }
      let a = this.tableDataTemp[index + 1];
      let ifront, iback;
      this.tableData.forEach((ele, index) => {
        if (ele.code == a.code) iback = index;
        if (ele.code == row.code) ifront = index;
      });
      this.tableData.splice(iback + 1, 0, row);
      this.tableData.splice(ifront, 1);
      this.searchContract();
    },
    edit(index) {
      this.contractInfo = this.tableDataTemp[index];
      this.showdialog2 = true;
    },
    editout(index, row) {
      console.log("删除");
      // this.tableData.splice(index, 1);
      //**************************************************************** */
      //控制删除后，不会因为搜索再将被删除的重新显示，因此要对tabledata进行修改
      this.tableData = this.tableData.filter((ele) => {
        if (ele.code == row.code) return false;
        else return true;
      });
      this.searchContract();
    },
  },
};
</script>


<style scoped>
.pagebox {
  min-width: 1000px;
  width: 100%;
}

/* 选择框和搜索框部分 */
.outside {
  display: flex;
  width: 98%;
  margin: 0 auto;
  justify-content: space-between;
}
.inside {
  flex: 4;
  overflow: hidden;
  margin-right: 30px;
}
.inside:nth-child(4) {
  flex: 5;
  margin-right: 0px;
}
.inside:nth-child(5) {
  cursor: pointer;
  flex: 1;
  margin-left: -5px;
  margin-right: 200px;
  z-index: 10;
  background-color: rgb(20, 172, 231);
  border-color: transparent;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: #fff;
}
.inside:last-child {
  cursor: pointer;
  flex: 2;
  min-width: 85px;
  padding: 0;
  margin-right: 0px;
  background-color: rgb(20, 172, 231);
  color: #fff;
  text-align: center;
  height: 40px;
  border-radius: 4px;
  border: 1px solid transparent;
}

/* 四个合同基本信息展示 */
.amount {
  width: calc(98% - 40px);
  min-width: 940px;
  height: 100px;
  margin: 25px auto;
  background-color: #fff;
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 0px 3px 2px 2px rgb(180, 190, 200);
  display: flex;
  justify-content: space-around;
}
.amount li {
  display: inline-block;
  min-width: 200px;
  height: 100%;
  /* margin: auto 70px; */
  position: relative;
}
.amount img {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.amount span {
  position: absolute;
  left: 80px;
  top: 20%;
  font-size: 16px;
  font-weight: 700;
}
.amount span:last-child {
  top: 60%;
  font-weight: 400;
  font-size: 13px;
}
.amountimg {
  width: 65px;
  height: 65px;
}

/* 表格最后一列带操作按钮 */
.cell {
  display: flex;
  justify-content: space-between;
}
.cell button {
  cursor: pointer;
  font-size: 6px;
  color: #fff;
  background-color: rgb(20, 172, 231);
  border-radius: 3px;
  width: 40px;
  height: 25px;
  overflow: hidden;
  text-align: center;
  padding: 0px;
  border-color: transparent;
  flex: 1;
}
.cell button:nth-child(2) {
  background-color: red;
  margin-left: 15px;
}
.cell button:nth-child(n + 3) {
  width: 45px;
  height: 25px;
  margin-left: 15px;
}
</style>
