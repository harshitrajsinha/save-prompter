document.addEventListener("DOMContentLoaded", function () {
  let newTextValue;
  const tAreaContainer = document.querySelector(".prompt-window__tarea");

  function setAsVariable() {
    const textArea = tAreaContainer.querySelector("textarea");
    let selectedText = textArea.value.substring(
      textArea.selectionStart,
      textArea.selectionEnd
    );
    const selectedStartPos = textArea.selectionStart;
    const selectedEndPos = textArea.selectionEnd - 1;
    const allText = textArea.value;
    if (selectedText) {
      if (allText.length === selectedEndPos - selectedStartPos) {
        newTextValue = "{{variable}}";
      } else {
        if (selectedStartPos === 0) {
          const partText = allText.substring(selectedEndPos + 1);
          newTextValue = "{{variable}}".concat(partText);
        } else if (selectedEndPos === allText.length - 1) {
          const partText = allText.substring(0, selectedStartPos);
          newTextValue = partText.concat("{{variable}}");
        } else {
          const firstPartText = allText.substring(0, selectedStartPos);
          const lastPartText = allText.substring(selectedEndPos + 1);
          newTextValue = firstPartText
            .concat("{{variable}}")
            .concat(lastPartText);
        }
        showCustomMenu();
      }
    }
  }

  function showCustomMenu() {
    let menu = document.querySelector(".prompt-window__customMenu");
    menu.style.display = "block";
    menu.style.left = `${event.clientX + 10}px`;
    menu.style.top = `${event.clientY + 10}px`;
  }

  tAreaContainer.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    event.stopPropagation();
    const textArea = tAreaContainer.querySelector("textarea");
    let selectedText = textArea.value.substring(
      textArea.selectionStart,
      textArea.selectionEnd
    );
    if (selectedText) {
      setAsVariable();
    }
  });

  tAreaContainer.addEventListener("dblclick", function (event) {
    event.stopPropagation();
    const textArea = tAreaContainer.querySelector("textarea");
    let selectedText = textArea.value.substring(
      textArea.selectionStart,
      textArea.selectionEnd
    );
    if (selectedText) {
      setAsVariable();
    }
  });

  document.addEventListener("click", function (e) {
    let menu = document.querySelector(".prompt-window__customMenu");
    if (menu.style.display !== "none") {
      menu.style.display = "none";
    }
  });

  document
    .querySelector(".prompt-window__customMenu button")
    .addEventListener("click", function () {
      if (newTextValue) {
        const textArea = tAreaContainer.querySelector("textarea");
        textArea.value = newTextValue;
      }
    });
});
