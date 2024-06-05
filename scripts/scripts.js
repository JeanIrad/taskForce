document.addEventListener("DOMContentLoaded", function () {
  const imageCollection = JSON.parse(localStorage.getItem("gallery")) || [];
  const createMemo = document.getElementById("createMemo");
  const form = document.getElementById("myForm");

  createMemo.addEventListener("click", function () {
    form.classList.toggle("hideForm");
    this.style.display = form.classList.contains("hideForm") ? "block" : "none";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;
    const fileInput = document.querySelector("input[type='file']");

    if (!title || !location || !description) {
      alert("Image should have location title and description!");
      return;
    }

    const data = { title, description, location, id: Date.now() };

    if (fileInput.files.length > 0) {
      const files = fileInput.files;
      for (let i = 0; i < files.length; i++) {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const fileReader = new FileReader();
        fileReader.onload = (function (image) {
          return (e) => {
            const { result } = e.target;
            div.innerHTML = `
                              <img src="${result}" alt="${data.title}" />
                              <div class="caption">
                                  <h2>${data.title}</h2>
                                  <p>${data.location}</p>
                              </div>
                              <a href="./description.html?id=${data.id}">Know More <i class="fa-solid fa-arrow-right"></i></a>
                          `;

            imageCollection.push({ url: result, ...data });
            localStorage.setItem("gallery", JSON.stringify(imageCollection));
            document.querySelector(".container").appendChild(div);
          };
        })(img);
        fileReader.readAsDataURL(files[i]);
      }
    }
    form.reset();
    createMemo.style.display = "block";
  });

  // Populate existing images from localStorage
  for (let i = 0; i < imageCollection.length; i++) {
    const div = document.createElement("div");
    div.innerHTML = `
              <img src="${imageCollection[i].url}" alt="${imageCollection[i].title}" />
              <div class="caption">
                  <h2>${imageCollection[i].title}</h2>
                  <p>${imageCollection[i].location}</p>
              </div>
              <a href="./description.html?id=${imageCollection[i].id}">Know More <i class="fa-solid fa-arrow-right"></i></a>
          `;
    document.querySelector(".container").appendChild(div);
  }
});
