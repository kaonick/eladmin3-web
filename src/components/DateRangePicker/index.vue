<template>
 <el-date-picker
    v-model="date"
    :disabledDate="isDisabled"
    :shortcuts="shortcuts"
    range-separator="至"
    @calendar-change="calendar"
    type="daterange"
    unlink-panels
    popper-class="myDatePicker"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
  />

</template>
<script>
export default {
  name: 'DateRangePicker',
}
</script>


<script setup>
    import { ref } from "vue";
    const date = ref('');
    const firstSelectedDayRef = ref(null);
    const onWeek = 1000 * 60 * 60 * 24 * 7;
    
    const isDisabled = (time) => {
      const firstSelectedDay = firstSelectedDayRef.value;
      if (firstSelectedDay) {
        return (
          time.getTime() < firstSelectedDay.getTime() - onWeek ||
          time.getTime() > firstSelectedDay.getTime() + onWeek
        );
      }
      return false;
    };

    const calendar = (date) => {
      const [minDate, maxDate] = date;
      if (minDate && !maxDate) {
        firstSelectedDayRef.value = minDate; //记录选中的首个日期
      } else {
        firstSelectedDayRef.value = null;
      }
    };
  </script>
  
<style>
    //日期控件禁用样式
  .myDatePicker {
      .el-picker-panel__content {
          .el-date-table {
              td.disabled .el-date-table-cell {
                  background-color: #fde2e2;
              }
          }
      }
  }
</style>