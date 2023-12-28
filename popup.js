document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from the PondiUni API
  fetch("https://pondiuni-notice-api.onrender.com/notice", { mode: "cors" })
    .then((response) => response.json())
    .then((data) => displayNotices(data))
    .catch((error) => console.error("Error fetching data:", error));

  // Display the notices in the popup
  function displayNotices(notices) {
    const noticesList = document.getElementById("notices-list");

    // Create an ordered list to display the notices
    const ol = document.createElement("ol");

    // Display the first 15 notices
    for (let i = 0; i < 15 && i < notices.length; i++) {
      const notice = notices[i];
      const li = document.createElement("li");
      li.innerHTML = `<strong>${notice.heading}</strong> - ${notice.date}`;

      // Open the associated URL in a new tab when clicked
      li.addEventListener("click", function () {
        chrome.tabs.create({ url: notice.url });
      });

      ol.appendChild(li);
    }

    // Append the ordered list to the noticesList div
    noticesList.appendChild(ol);
  }
});
