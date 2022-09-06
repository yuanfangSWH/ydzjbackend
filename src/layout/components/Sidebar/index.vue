<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar
      wrap-class="scrollbar-wrapper"
      style="margin-bottom: -5px; margin-right: -5px"
    >
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import system from "@/api/system"; //配置

export default {
  data() {
    return {
      routes: [],
      permission: [],
    };
  },
  created() {
    this.pullData();
  },
  methods: {
    //判断是去请求还是获取VUEX的数据
    pullData() {
      if (this.$store.state.temporaryZU == "") {
        system.configCategory().then((res) => {
          this.permission = res.data.data;
          this.dyeData();
        });
      } else {
        this.permission = this.$store.state.temporaryZU;
        this.dyeData();
      }
    },
    //渲染侧边栏
    dyeData() {
      var value = [];
      this.permission.map((item, index) => {
        value.push({
          path: "/projectSystem" + index,
          hidden: false,
          meta: {
            title: item.category_name,
            //icon: "dashboard",
          },
        });
      });
      var newRoutes = [
        {
          path: "/project",
          name: "ProjectSystem",
          menuName: "ConfigManager",
          hidden: false,
          redirect: "/projectSystem",
          meta: {
            title: "配置",
            requireAuth: true,
            icon: "setup3",
          },
          children: value,
        },
      ];
      var newRoutes2 = this.$router.options.routes;
      newRoutes2 = newRoutes2.concat(newRoutes);
      // this.routes = newRoutes2;
      this.getMenuPrivilege(newRoutes2);
    },
    getMenuPrivilege(newRoutes) {
      this.api.user.menuList().then((res) => {
        // let menuList = []
        if(res.data.data.menus) {
          res.data.data.menus.forEach((item) => {
            if (item.component == "ConfigManager") {
              let i = newRoutes.find((o) => o.menuName == "ConfigManager");
              this.routes.push(i);
            }
            newRoutes.forEach((it) => {
              if (
                it.menuName == item.component &&
                item.component != "ConfigManager"
              ) {
                it.meta.title = item.meta.title;
                let childrenItem = JSON.parse(JSON.stringify(it));
                childrenItem.children.forEach((i, n) => {
                  childrenItem.children[n].hidden = !item.children.some(
                    (itemChildren) => {
                      return itemChildren && itemChildren.component == i.menuName;
                    }
                  );
                });
                this.routes.push(childrenItem);
              }
            });
          });
        }
      });
    },
  },
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
