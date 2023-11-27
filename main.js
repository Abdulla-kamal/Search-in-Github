let input = document.querySelector(".github .searchContainer input"),
  button = document.querySelector(".github .searchContainer button"),
  reposData = document.querySelector(".github .repos");

button.onclick = (_) => {
  getData();
};

function getData() {
  if (input.value === "") {
    reposData.innerHTML = `<div class="repo" style = "text-align: center; display:block; padding:20px">There Is No Data To Show</div>`;
  } else {
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then((res) => res.json())
      .then((repos) => {
        reposData.innerHTML = ``;
        repos.forEach((repo) => {
          let mainDiv = document.createElement("div");
          let spanName = document.createElement("span"),
            spanStars = document.createElement("span");
          let textName = document.createTextNode(repo.name);
          spanName.appendChild(textName);
          let stars = document.createTextNode(`Stars ${repo["stargazers_count"]}`);
          spanStars.appendChild(stars);
        // Create div Data 
        let divData = document.createElement("div");
          //Creat <a> Link
          let myUrl = document.createElement("a");
          let urlText = document.createTextNode("Visit");
          //   Set Target Attribute With _blank Vlue To My Url
          myUrl.href = `https://github.com/${input.value}/${repo.name}`;
          myUrl.appendChild(urlText);
          myUrl.setAttribute("target", "_blank")
          mainDiv.className = "repo";
          divData.appendChild(spanStars)
          divData.appendChild(myUrl)
          mainDiv.appendChild(spanName);
          mainDiv.appendChild(divData);
          reposData.appendChild(mainDiv);
        });
      });
  }
}
