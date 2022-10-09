fetch(
  "http://openapi.foodsafetykorea.go.kr/api/add638aaa6f6417cb9a4/COOKRCP01/json/1/5/RCP_NM=쿠키"
)
  .then((response) => {
    return response.json(); // 수신한 데이터
  })
  .then((response) => {
    // then()의 괄호에 결과를 적어줌
    console.log(response.COOKRCP01.row[0].RCP_NM);
    console.log(response.COOKRCP01.row[0].ATT_FILE_NO_MAIN);
    document.querySelector("div").append(response.COOKRCP01.row[0].RCP_NM);
    document
      .getElementById("x")
      .append(document.getElementById("response.COOKRCP01.row[0].RCP_NM"));
    document
      .querySelector("img")
      .append(response.COOKRCP01.row[0].ATT_FILE_NO_MAIN);
    document.getElementById("parent").src =
      "response.COOKRCP01.row[0].ATT_FILE_NO_MAIN";
  });
