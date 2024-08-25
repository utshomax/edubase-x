export const state = () => ({
  students: []
});

export const mutations = {
  SET_STUDENTS(state, students) {
    state.students = students;
  },
  ADD_STUDENT(state, student) {
    state.students.push(student);
  },
  REMOVE_STUDENT(state, student) {
    state.students.splice(
      state.students.findIndex(x => x.roll == student.roll),
      1
    );
  },
  UPDATE_STUDENT(state, { index, data }) {
    Object.assign(state.students[index], data);
  },
  UPDATE_DUE(state, { roll, due }) {
    state.students.find(x => x.roll == roll).due = due;
  }
};
export const actions = {
  async getStudents({ commit }) {
    let { data } = await this.$api.student.all();
    commit("SET_STUDENTS", data);
  },
  async addStudent({ commit }, student) {
    let { status, data } = await this.$api.student.add(student);
    if (status == 200) {
      commit("ADD_STUDENT", data);
    }
  },
  async updateStudent({ commit }, editedData) {
    console.log(editedData);
    let { status, data } = await this.$api.student.update(editedData.student);
    console.log(data);
    if (status == 200) {
      commit("UPDATE_STUDENT", { index: editedData.index, data: data });
    }
  },
  async deleteStudent({ commit }, student) {
    let { status, data } = await this.$api.student.delete(student.roll);
    if (status == 200) {
      commit("REMOVE_STUDENT", student);
    }
  },
  async updateDue({ commit }, data) {
    commit("UPDATE_DUE", { roll: data.studentid, due: data.due });
  }
};

//Getters
export const getters = {
  getStudentbyid: state => id => {
    return state.students.find(x => x.id == id);
  },
  getStudentByBatchId: state => batchid => {
    return state.students.filter(x => x.batchid == batchid).length;
  },
  getAllStudent: state => {
    return state.students;
  },
  getTotalDues: state => {
    return state.students.reduce((n, { due }) => n + due, 0);
  }
};
