<template>
  <div class="helper"> 
    <span class="left"> {{unFinishedTodoLength}} items left</span>
    <span class="tabs">
      <span v-for="state in states" :key="state" 
      :class="[state,filter===state?'actived':'']"
      @click="toggleFilter(state)"
      >
        {{state}}
      </span>
    </span>
    <span class="clear" @click="clearAllCompleted">Clear completed</span>
  </div>
</template>
<script>
export default {
  props:{
    filter:{
      type:String,
      required:true
    },
    todos:{
      type:Array,
      required:true
    }
  },
  data(){
    return {
      states:['all','active','completed']
    }
  },
  computed:{
    unFinishedTodoLength(){
      return this.todos.filter(todo=>!todo.completed).length
    }
  },
  methods:{
    toggleFilter(state){
      this.$emit('toggle',state)
    },
    clearAllCompleted(){
      this.$emit('clearAll')
    }
  }
}
</script>
<style lang="stylus" scoped>
 .helper{
   display:flex;
   padding:16px;
   background:#fff;
   justify-content space-between
 }
 .left{


 }

 .tabs{
   span{
     padding:6px;
     border-radius:5px;
   }
    .actived{
      border:1px solid red;
    }
 }
 .clear{

 }
</style>
