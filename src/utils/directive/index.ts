import store from "@/store/store"
const roleInfo=(store as any).state.admintor.roleInfo
export const auth={
  bind(el,binding){
    if(roleInfo){
      if (roleInfo.identity != binding.value) {
        el.style.display = "none";
      }
    }
  }
}