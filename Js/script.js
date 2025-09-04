

const creatElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return(htmlElements.join(" "));
};


const manageSpinr = (status) => {
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word_container").classList.add("hidden");
    }
    else {
        document.getElementById("word_container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
};

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};
// Remove Active btn
const removeActive = () => {
    const lessonBtns = document.querySelectorAll(".lesson_btn");
    lessonBtns.forEach(btn => btn.classList.remove("active"));
};

// Lesson btn functionality
const loadLevelWord = (id) => {
    manageSpinr(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive()
        const clickedBtn = document.getElementById(`lesson_btn_${id}`);
        clickedBtn.classList.add("active");
        displayLevleWord(data.data)
    });
}; 

const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};
const displayWordDetails = (word)=> {
    console.log(word)
    const detailsBox = document.getElementById("details_container");
    detailsBox.innerHTML = `
        <div class="">
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
        </div>
        <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p class="font_bangla">${word.meaning}</p>
        </div>
        <div class="">
            <h2 class="font-bold">Example</h2>
            <p class="">${word.sentence}</p>
        </div>
        <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div class="">${creatElements(word.synonyms)}</div>
        </div>
    `;
    document.getElementById("word_modal").showModal();

}

const displayLevleWord = (words) =>  {
    const wordContainer = document.getElementById("word_container");
    wordContainer.innerHTML = "";

    if(words.length === 0){
        wordContainer.innerHTML = `
            <div class="text-center col-span-full rounded-xl py-10 space-y-6 font_bangla">
                <img class="mx-auto" src="./Images/alert-error.png" />
                <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান।</h2>
            </div>
        `;
        manageSpinr(false);
        return;
    }

    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
                <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h2>
                <p class="font-semibold">Meaning /Pronounciation</p>
                <div class="font_bangla text-2xl font-medium">"${word.meaning? word.meaning : "অর্থ পাওয়া যায় নি"} / ${word.pronunciation? word.pronunciation : "Pronunciation পাওয়া যায় নি"  }"</div>
                <div class="flex justify-between items-center">
                    <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>

                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>

        `;
        wordContainer.append(card);
    });
    manageSpinr(false);
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
            <button id="lesson_btn_${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson_btn">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `;
        // Append
        levelContainer.append(btnDiv);
    }
};

loadLessons();

// Search Funcationality
document.getElementById("search_btn")
    .addEventListener('click', () => {
        removeActive();
        const input = document.getElementById("input_search");
        const searchValue = input.value.trim().toLowerCase();

        fetch("https://openapi.programming-hero.com/api/words/all")
        .then((res) => res.json())
        .then((data) => {
            const allWords = data.data
            const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
            displayLevleWord(filterWords);
        });
    });

