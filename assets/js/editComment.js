import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteCommentBtnList = document.querySelectorAll(
  "button.jsDeleteCommentBtn",
);

// 현재 화면에서만 views를 1 증가 (DB에는 X)
const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

// fake comment (Realtime 처럼 보이게 하기 위해 사용
const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
};

const sendCommentCreate = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const sendCommentDelete = async (commentId) => {
  const response = await axios({
    url: `/api/${commentId}/comment/delete`,
    method: "POST",
    data: {
      commentId,
    },
  });
  if (response.status === 200) {
    // todo : 부분 refresh
  }
};

const handleSubmit = (event) => {
  event.preventDefault(); // 새로고침 방지
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendCommentCreate(comment);
  commentInput.value = "";
};

const handleDeleteBtn = (event) => {
  const commentId = event.srcElement.getAttribute("data-comment-id");
  sendCommentDelete(commentId);
  window.location.reload();
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  deleteCommentBtnList.forEach((btn) => {
    btn.addEventListener("click", handleDeleteBtn);
  });
}

if (addCommentForm) {
  init();
}
