<template>
  <div class="container mt-5">
    <div class="row">
      <form @submit.prevent="submitForm" class="col-sm-4">
        <h3>{{ isEditing ? "Cập nhật học sinh" : "Thêm học sinh" }}</h3>

        <div class="mb-3 mt-3">
          <label for="name">Họ tên:</label>
          <input
            type="text"
            class="form-control"
            v-model="student.name"
            id="name"
            required
          />
        </div>

        <div class="mb-3">
          <label for="score">Điểm:</label>
          <input
            type="number"
            max="10"
            min="0"
            class="form-control"
            v-model="student.score"
            id="score"
            required
          />
        </div>

         <div class="mb-3">
          <label for="status">Tình trạng</label>
          <input
            type="text"
            class="form-control"
            v-model="student.status"
            id="status"
            required
          />
        </div>

        <div class="mb-3">
          <label for="dob">Ngày sinh:</label>
          <input
            type="date"
            class="form-control"
            v-model="student.dob"
            id="dob"
            required
          />
        </div>

        <button type="submit" class="btn btn-success">
          {{ isEditing ? "Cập nhật" : "Thêm" }}
        </button>
      </form>

      <div class="col-sm-8">
        <h3>Danh sách học sinh</h3>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Họ và tên</th>
              <th>Điểm</th>
              <th>Tình trạng</th>
              <th>Ngày sinh</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stu, index) in students" :key="index">
              <td>{{ stu.name }}</td>
              <td>{{ stu.score }}</td>
              <td>{{ stu.status }}</td>
              <td>{{ stu.dob }}</td>
              <td>
                <button
                  class="btn btn-warning me-2"
                  @click="editStudent(index)"
                >
                  Sửa
                </button>
                <button class="btn btn-danger" @click="deleteStudent(index)">
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Dữ liệu mẫu ban đầu [cite: 181]
const students = ref([
  { name: "Nguyễn Chí Hùng", score: 8, dob: "2006-01-01" },
  { name: "Phạm Thị Lan", score: 9, dob: "2006-05-15" },
]);

// Biến quản lý form [cite: 186]
const student = ref({
  name: "",
  score: null,
  dob: "",
});

let isEditing = ref(false);
let editingIndex = ref(null);

// Hàm xử lý Submit (Thêm hoặc Sửa) [cite: 197]
function submitForm() {
  if (isEditing.value) {
    // Cập nhật thông tin: Gán giá trị mới vào vị trí index đang sửa
    students.value[editingIndex.value] = { ...student.value };
    isEditing.value = false;
    editingIndex.value = null;
  } else {
    // Thêm mới: Push vào mảng
    students.value.push({ ...student.value });
  }
  resetForm();
}

// Hàm chuẩn bị dữ liệu để sửa
function editStudent(index) {
  student.value = { ...students.value[index] }; // Copy dữ liệu vào form
  isEditing.value = true;
  editingIndex.value = index;
}

// Hàm xóa [cite: 216]
function deleteStudent(index) {
  if (confirm("Bạn có chắc muốn xóa?")) {
    students.value.splice(index, 1);
  }
}

// Hàm reset form
function resetForm() {
  student.value = {
    name: "",
    score: null,
    dob: "",
  };
}
</script>
