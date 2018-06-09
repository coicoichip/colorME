import { observable, action, computed } from "mobx";
import {getScheduleApi} from "./scheduleApi";
import { STRINGS } from "../../constants";



export default (scheduleStore = new class scheduleStore {
  @observable isLoading = true;
  @observable data = [];
  @observable error = false;

  @action
  getListSchedule() {
    this.isLoading = true;
    getScheduleApi()
      .then(res => {
        //console.log(res);
        this.data = res.data;
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
        this.error = true;
      });
  }
  
  @computed
  get scheduleData() {
    return this.data.map(function(schedule) {
      return schedule.lessons.map(function(lesson) {
        return {
          start_time: lesson.start_time,
          end_time: lesson.end_time,
          date: lesson.time,
          name_lesson: (lesson.name === undefined) ? STRINGS.UPDATING_INFORMATION : lesson.name,
          course: schedule.course,
          room: schedule.room,
          name_teacher: (schedule.teacher === undefined) ? STRINGS.UPDATING_INFORMATION : schedule.teacher.name,
        }
      });
    });
  }
}());
