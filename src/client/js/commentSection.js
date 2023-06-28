import fetch from "node-fetch";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteComment = document.querySelectorAll(".commentDelete");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text} `;
  const button = document.createElement("button");
  button.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(button);
  videoComments.prepend(newComment);
};

const handleDeleteComment = async (event) => {
  const commentList = event.target.parentNode;
  const commentId = commentList.dataset.id;
  const videoId = videoContainer.dataset.id;
  const response = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      videoId,
    }),
  });
  if (response.status === 200) {
    const commentContainer = document.querySelector(".video__comments ul");
    const commentList = event.target.parentNode;
    commentContainer.removeChild(commentList);
  }
  if (response.status === 403) {
    alert("You are not the owner of the comment.");
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (deleteComment) {
  console.log(deleteComment.length);
  for (let i = 0; i < deleteComment.length; i++) {
    deleteComment[i].addEventListener("click", handleDeleteComment);
  }
}
