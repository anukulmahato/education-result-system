const resultSearchForm = document.getElementById("result-search-form");
const editPzlLabel = document.getElementById("edi-plz");

/**
 *
 * Result  Search Form Manger
 */
let plz1 = getRandomNumber();
let plz2 = getRandomNumber();

localStorage.setItem("edu_pzl", JSON.stringify({ a: plz1, b: plz2 }));
editPzlLabel.innerHTML = ` ${plz1} + ${plz2} `;

resultSearchForm.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  //get pzl data
  const pzlData = JSON.parse(localStorage.getItem("edu_pzl"));
  const stuData = JSON.parse(localStorage.getItem("students"));

  // check pzl
  if (pzlData.a + pzlData.b !== parseInt(data.pzl)) {
    alert("Pzl not match");
  } else {
    const searchData = stuData.find(
      (item) =>
        item.roll == data.roll &&
        item.reg == data.reg &&
        item.exam == data.examination &&
        item.year == data.year &&
        item.board == data.board
    );
    if(searchData){
        localStorage.setItem("searchData", JSON.stringify(searchData));
        window.location.href = "result.html";
    }else{
        alert("কোন ফলাফল পাওয়া যায়নি");
    }
  }
};
