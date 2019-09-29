import {Component,Vue,Prop,Watch} from "vue-property-decorator"
@Component({})
export default class TableMixin extends Vue{
 
  @Prop(Boolean)
  outerVisible!: boolean;
  @Prop(String)
  title!:string
  
  innerVisible: boolean = false;

  handleCancel() {
    this.$emit("update:outerVisible", false);
  }
 

  @Watch("outerVisible")
  outerVisibleChange(newVal) {
    this.innerVisible = newVal;
  }

  @Watch("innerVisible")
  innerVisibleChange(newVal) {
    !newVal && this.handleCancel();
  }

}