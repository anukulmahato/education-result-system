const studentCreateForm = document.getElementById("student-create-form");
const studentResultForm = document.getElementById("student-result-form");
const studentDataList = document.getElementById("student-data-list");
const studentResultViewForm = document.getElementById("student-result-view");
const singleStudentData = document.getElementById("singleStudentData");
const msg = document.querySelector(".msg");
const btnClose = document.querySelectorAll(".btn-close");

/**
 *Show all data
 */

const getAllStudents = () => {
  // get all data form ls
  const data = JSON.parse(localStorage.getItem("students"));
  let listData = "";
  if (data) {
    data.reverse().map((item, index) => {
      listData += `
        <tr>
          <td>${index + 1}</td>
          <td><img
          class="profile-pic border border-5"
          src="${item.photo}"
        /></td>
          <td>${item.name}</td>
          <td>${item.roll}</td>
          <td>${item.reg}</td>
          <td>${item.board}</td>
          <td>${timeAgo(item.createdAt)}</td>
          <td>
          ${
            item.results
              ? '<button class="btn btn-sm btn-success" onclick="getViewResultData(\'' +
                item.id +
                '\')" data-bs-toggle="modal" data-bs-target="#student-result-view">View Result</button>'
              : '<button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#student-result-form" onclick="addStudentResultModal(\'' +
                item.id +
                "')\">Add Result</button>"
          }
            
          </td>
          <td>
            <button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#student-info-quickView" onclick="showSingleStudent('${item.id}')"><i class="fa fa-eye"></i></button>
            <button class="btn btn-sm btn-warning"><i class="fa fa-edit"></i></button>
            <button class="btn btn-sm btn-danger" onclick="delateSingleStudent('${item.id}')"><i class="fa fa-trash"></i></button>
          </td>
        </tr>
      `;
    });
  } else {
  }

  studentDataList.innerHTML = listData;
};
getAllStudents();

const showSingleStudent = (id) => {
  const studentData = JSON.parse(localStorage.getItem("students"));

  const viewData = studentData.find((data) => data.id == id);

  singleStudentData.innerHTML = `
  <!--card1-->
  <div class="card-main-div border border-5 rounded">
    <div>
      <div
        class="card1-pic-main border border-start-0 border-end-0 border-top-0 border-secondary border-opacity-30 border-5"
      >
        <p class="profile-name h1 pt-3 text-center">
        ${viewData.inst}
        </p>
      </div>
    </div>
    <div class="profile-pic-div mb-2 text-center">
      <img
        class="profile-pic border border-5"
        src="${viewData.photo}"
      />
    </div>
    <!--About me-->
    <div class="py-3">
      <ul>
        <li>
          <span style="width: 130px; display: inline-block"
            >Name</span
          >: ${viewData.name}
        </li>
        <li>
          <span style="width: 130px; display: inline-block"
            >Rool No</span
          >: ${viewData.roll}
        </li>
        <li>
          <span style="width: 130px; display: inline-block"
            >Reg No</span
          >: ${viewData.reg}
        </li>
        <li>
          <span style="width: 130px; display: inline-block"
            >Session</span
          >: ${viewData.year}
        </li>
        <li>
          <span style="width: 130px; display: inline-block"
            >D.O.B</span
          >: ${viewData.dob}
        </li>
      </ul>
    </div>
  </div>
  <!--card1 end-->
  `;
}

const delateSingleStudent = (id) => {
  const studentData = JSON.parse(localStorage.getItem("students"));

  const delateData = studentData.filter((data) => data.id != id);
  localStorage.setItem("students", JSON.stringify(delateData))
  getAllStudents();
}


/**
 * Submit Student Create Form
 */
studentCreateForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  // form validation
  if (!data.name || !data.father || !data.mother || !data.roll || !data.reg) {
    msg.innerHTML = createAlert("All fields are required");
  } else {
    let oldData = [];
    // check old data exists or not
    if (localStorage.getItem("students")) {
      oldData = JSON.parse(localStorage.getItem("students"));
    }

    // push new data
    oldData.push({
      ...data,
      id: createID(),
      createdAt: Date.now(),
      updatedAt: null,
      results: null,
    });

    // send data to ls
    localStorage.setItem("students", JSON.stringify(oldData));
    e.target.reset();
    btnClose.forEach((item) => item.click());
    getAllStudents();
  }
};

/**
 * Add student modal
 */
const addStudentResultModal = (id) => {
  studentResultForm.querySelector('input[name="id"]').value = id;
};

/**
 * Student Result Form
 */
studentResultForm.onsubmit = (e) => {
  e.preventDefault();

  // get form data
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  // get all student
  const students = JSON.parse(localStorage.getItem("students"));

  // add result
  const updatedData = students.map((item) => {
    if (item.id == data.id) {
      return {
        ...item,
        results: {
          bangla: data.bangla,
          english: data.english,
          math: data.math,
          science: data.science,
          social: data.social,
          religion: data.religion,
        },
      };
    } else {
      return item;
    }
  });

  // now update LS
  localStorage.setItem("students", JSON.stringify(updatedData));

  e.target.reset();
  btnClose.forEach((item) => item.click());
  getAllStudents();
};

/**
 * Get view result Data
 */
const getViewResultData = (id) => {
  const studentData = JSON.parse(localStorage.getItem("students"));

  const viewData = studentData.find((data) => data.id == id);

  studentResultViewForm.querySelector('input[name="bangla"]').value =
    viewData.results.bangla;
  studentResultViewForm.querySelector('input[name="english"]').value =
    viewData.results.english;
  studentResultViewForm.querySelector('input[name="math"]').value =
    viewData.results.math;
  studentResultViewForm.querySelector('input[name="science"]').value =
    viewData.results.science;
  studentResultViewForm.querySelector('input[name="social"]').value =
    viewData.results.social;
  studentResultViewForm.querySelector('input[name="religion"]').value =
    viewData.results.religion;
  studentResultViewForm.querySelector('input[name="id"]').value = id;
};

/**
 * studentResultViewForm submit
 */
studentResultViewForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data);

  // update new result
  const oldData = JSON.parse(localStorage.getItem("students"));

  const updateData = oldData.map((item) => {
    if (item.id == data.id) {
      return {
        ...item,
        results: {
          bangla: data.bangla,
          english: data.english,
          math: data.math,
          science: data.science,
          social: data.social,
          religion: data.religion,
        },
      };
    } else {
      return item;
    }
  });
  localStorage.setItem("students", JSON.stringify(updateData));
  btnClose.forEach((item) => item.click());
  getAllStudents();
};