let fileInput = document.getElementById("file-input");
let fileList = document.getElementById("files-list");

fileInput.addEventListener("change", () => {
    fileList.innerHTML = "";
    for (i of fileInput.files) {
      let listItem = document.createElement("li");
      let fileName = i.name;
      let fileSize = (i.size / 1024).toFixed(1);
      listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}KB</p>`;
      if (fileSize >= 1024) {
        fileSize = (fileSize / 1024).toFixed(1);
        listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}MB</p>`;
      }
      fileList.appendChild(listItem);
    }
});