const URL = `https://pokeapi.co/api/v2/pokemon/`;
let Selected = null



const Container = document.querySelector('#Poke-container');

const FinalAnswer = document.querySelector('#CheckAnswer');
const MaxId = 450;
const Answers = new Array(4).fill(0);
let Correct = null;

async function getPokemon() {
    let term = Math.floor(Math.random() * MaxId);
    console.log(term);
    const response = await fetch(`${URL}${term}`);
    const resp = await response.json();
    let i = Math.floor(Math.random() * 4);
    console.log(resp);
    Answers[i] = `${resp.name[0].toUpperCase()}${resp.name.slice(1)}`;
    Correct = resp.name[0].toUpperCase() + resp.name.slice(1);
    for (let i = 0; i < 4; i++) {
        if (Answers[i] != 0)
            continue;
        console.log("Hello");
        let term = Math.floor(Math.random() * MaxId);
        const response = await fetch(`${URL}${term}`);
        const resp = await response.json();
        Answers[i] = resp.name;
        Answers[i] = `${Answers[i][0].toUpperCase()}${Answers[i].slice(1)}`;
    }
    Container.innerHTML = `<img src="${resp.sprites.other['official-artwork'].front_default}"
            alt="Error">
        <span>Guess the Pokemon</span>
        <div class="Answers">
            <option value="${Answers[0]}">${Answers[0]}</option>
            <option value="${Answers[1]}">${Answers[1]}</option>
            <option value="${Answers[2]}">${Answers[2]}</option>
            <option value="${Answers[3]}">${Answers[3]}</option>
        </div>`;
    const Options = Container.querySelectorAll('option');
    console.log(Options);
    Options.forEach(item => {
        item.addEventListener('click', () => {
            // Firstly remove the completed class from all the options.
            Options.forEach(i => {
                i.classList.remove('Select');
            });
            item.classList.add('Select');
            Selected = item.value;
        })
    })
}

FinalAnswer.addEventListener('click', () => {
    if (Selected == null) {
        alert('Select an Answer!');
        return;
    }
    if (Selected == Correct)
        alert('Congratulations You Won!');
    else
        alert("Incorrect Answer\n Correct Answer: " + Correct);
    location.reload();
})

getPokemon();