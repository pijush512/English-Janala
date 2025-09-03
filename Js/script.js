


const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};
// Lesson btn functionality
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevleWord(data.data))
};

/***
 * {
    "id": 87,
    "level": 1,
    "word": "Sun",
    "meaning": "সূর্য",
    "pronunciation": "সান"
}
 * **/ 
const displayLevleWord = (words) =>  {
    const wordContainer = document.getElementById("word_container");
    wordContainer.innerHTML = "";
    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
                <h2 class="text-2xl font-bold">${word.word}</h2>
                <p class="font-semibold">Meaning /Pronounciation</p>
                <div class="font_bangla text-2xl font-medium">"${word.meaning} / ${word.pronunciation}"</div>
                <div class="flex justify-between items-center">
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>

                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>

        `;
        wordContainer.append(card);
    });
};
// Display Lesson Functionality
const displayLessons = (lessons) => {
    // get the container & empty
    const levelContainer = document.getElementById("level_container");
    levelContainer.innerHTML = "";
    for(let lesson of lessons){
        // Creat element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `;
        // Append
        levelContainer.append(btnDiv);
    }
};

loadLessons();

