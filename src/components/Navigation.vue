<template>
  <div
    class="box"
    :style="{ '--navheight': navheight + 'px', '--navwidth': navwidth + 'px' }"
  >
    <el-tree
      :data="data"
      accordion
      node-key="id"
      ref="navtree"
      highlight-current
      @node-click="pathChange"
      @mouseleave.native="leaveTree"
    >
      <span
        :title="data.label"
        slot-scope="{ node, data }"
        @mouseenter="updateNewId(data)"
        @mouseleave="updateOldId(data)"
      >
        {{ node.label }}
      </span>
    </el-tree>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "NavTab",
  data() {
    return {
      data: [],
      currentId: "",
      oldId: "",
      newId: "",
      expandedList: [],
    };
  },
  props: {
    navwidth: { type: Number, require: true },
    navheight: { type: Number, require: true },
    treearr: { type: Array, require: true },
  },
  watch: {
    treearr(newV) {
      this.data = this.getTreeData(newV, "");
    },
    flag(newFlag) {
      // 控制节点是否expanded，控制其children展开否，但无children的，设置属性为true不报错。且想要下级展开，其母系上级必须全都展开
      if (newFlag.oldId == "" && newFlag.newId != "") {
        //外侧进入navtree，新开，无旧
        this.$refs.navtree.store.nodesMap[newFlag.newId].expanded = true;
        return;
      }
      if (newFlag.newId == "") {
        //navtree出去，离开后需要当前oldId极其母系所有节点都关闭
        // let oldArr = this.getAncestors(newFlag.oldId);
        // for (var item in oldArr) {
        //   this.$refs.navtree.store.nodesMap[item].expanded = false;
        // }
        this.closeAll(this.data);
        console.log("leave navtree!");
        return;
      }
      let params = this.getHoverParams(newFlag.oldId, newFlag.newId);
      if (params.sameLevel == true) {
        //同级亲兄弟，新开旧关
        this.$refs.navtree.store.nodesMap[newFlag.oldId].expanded = false;
        this.$refs.navtree.store.nodesMap[newFlag.newId].expanded = true;
      } else {
        if (params.uptodown == true) {
          //母去子（必是非隔代）新开旧不关
          this.$refs.navtree.store.nodesMap[newFlag.newId].expanded = true;
          this.$refs.navtree.store.nodesMap[newFlag.oldId].expanded = true;
        } else {
          //子代去祖先各代，两种情况
          let downArr = this.getAncestors(newFlag.oldId);
          let upLen = this.getAncestors(newFlag.newId).length;
          let downLen = downArr.length;
          if (params.blood == true) {
            // 情况1：子孙去了某直系亲属，例如1-2-2-1到1-2，则亲代以后到子代都关闭，不含亲代
            for (var i = upLen; i < downLen; i++) {
              this.$refs.navtree.store.nodesMap[downArr[i]].expanded = false;
            }
          } else {
            for (var j = upLen - 1; j < downLen; j++) {
              this.$refs.navtree.store.nodesMap[downArr[j]].expanded = false;
            }
            // 情况2：子孙去了某代直系亲属的亲兄弟，例如1-2-2-1到1-1（1-2的亲兄弟）
          }
        }
      }
    },
  },
  computed: {
    flag() {
      const { oldId, newId } = this;
      return { oldId, newId };
    },
  },
  mounted() {
    this.data = this.getTreeData(this.treearr, "");
  },
  methods: {
    leaveTree() {
      this.newId = "";
      this.oldId = "";
      // this.closeAll(this.data);
    },
    closeAll(objArr) {
      // 关闭所有节点
      for (var i = 0; i < objArr.length; i++) {
        this.$refs.navtree.store.nodesMap[objArr[i].id].expanded = false;

        if (objArr[i].children != undefined) {
          this.closeAll(objArr[i].children);
        }
      }
    },
    updateNewId(x) {
      this.newId = x.id;
      // console.log("this.newId:",this.newId);
    },
    updateOldId(x) {
      this.oldId = x.id;
      // console.log("this.oldId:",this.oldId);
    },
    getHoverParams(oldId, newId) {
      //此函数没有涉及从外到navtree以及从navtree离开，这两种在watch中直接解决
      //watch属性中必需的工具函数，返回对象包含：两个id是否同级别sameLevel=bool；是否从上向下uptodown=bool；
      //要判断是否是子代直系亲属去了亲代，涉及旧关的个数
      //newId是几级（因为从该级向下一直到oldId都要关闭）
      var a = oldId.split("-").length;
      var b = newId.split("-").length;
      let result = {};
      result.sameLevel = a == b ? true : false;
      result.uptodown = a < b ? true : false;
      if (b < a) {
        //判断是否直系，从1级到newid这一级，如果都一样则是直系
        let aArr = this.getAncestors(oldId);
        let bArr = this.getAncestors(newId);
        let relation = true;
        for (var i = 0; i < b; i++) {
          if (aArr[i] != bArr[i]) {
            // 例如1-2-2-1→→1-2，第一位1同第二位2同，则二者是
            relation = false;
          }
        }
        result.blood = relation;
      } else {
        result.blood = false;
      }

      return result;
    },
    getAncestors(str) {
      //从navtree离开后需要当前oldId极其母系所有节点都关闭，因此需要获得母系id们
      if (str == "") return;
      let result = [];
      let s = str.split("-");
      s.forEach((element, index) => {
        if (index == 0) result.push(element);
        else result.push(result[index - 1] + "-" + element);
      });

      return result;
    },
    pathChange(nodedata, node) {
      // console.log("node-click参数1", nodedata);
      // console.log("node-click参数2", node);
      if (node.childNodes.length != 0) return;
      else this.$router.push(nodedata.path);
      // console.log("node-click参数3", nodevm);
      //在有children，上层也展开前提下才能生效
      // this.$refs.navtree.store.nodesMap["2"].expanded = true;
      // this.$refs.navtree.store.nodesMap["2-1"].expanded = true;
    },

    getTreeData(arr, ex) {
      //arr是children，ex是id前缀。返回对象是[]
      let result = [];
      let l = arr.length;
      for (var i = 0; i < l; i++) {
        let a = {};

        if (ex == "") {
          a.id = String(i + 1);
        } else {
          a.id = ex + "-" + String(i + 1);
        }
        a.path = arr[i].path; //设定是若有子菜单，点击当前节点进入第一个子菜单，所以要求必须配置
        a.label = arr[i].title;
        //  if (arr[i].children)
        if (arr[i].children != undefined) {
          let extemp = ex + String(i + 1);
          a.children = this.getTreeData(arr[i].children, extemp);
        }
        result.push(a);
      }
      return result;
    },
  },
};
</script>

<style scoped>
.box {
  width: var(--navwidth);
  height: var(--navheight);
  margin: 0 auto;
}
span {
  text-overflow: ellipsis;
}
.el-tree {
  background-color: whitesmoke;
  width: 100%;
  height: calc(100% - 20px);
  margin: 10px auto;
  font-size: 16px;
  overflow: hidden;
}
::v-deep .el-icon-caret-right:before {
  content: "\e723";
  font-size: 16px;
}
::v-deep .expanded:before {
  content: "\e722";
  font-size: 16px;
}
::v-deep .el-tree-node__expand-icon.expanded {
  transform: none;
}
</style>