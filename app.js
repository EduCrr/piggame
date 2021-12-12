'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const dadoEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRol = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const pontos0El = document.querySelector('#current--0');
const pontos1El = document.querySelector('#current--1');

let scores, pontos, playerAtivo, jogando;

function initGame() {
  scores = [0, 0];
  pontos = 0;
  playerAtivo = 0;
  jogando = true;
  pontos0El.textContent = 0;
  pontos1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  dadoEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

initGame();

//dado funcionalidade

function switchPlayer() {
  document.getElementById(`current--${playerAtivo}`).textContent = 0;
  playerAtivo = playerAtivo === 0 ? 1 : 0;
  pontos = 0;
  //mudar a classe
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

btnRol.addEventListener('click', () => {
  if (jogando) {
    //generar dado aleatorio
    const dadoNumero = Math.trunc(Math.random() * 6) + 1;

    //mostar dado
    dadoEl.classList.remove('hidden');
    dadoEl.src = `dice-${dadoNumero}.png`;

    //checar se é dado 1 e sim trocar para outro player
    if (dadoNumero !== 1) {
      pontos += dadoNumero;
      document.getElementById(`current--${playerAtivo}`).textContent = pontos;
    } else {
      //mudar para jogador 2 rever 84. Switching the Active Player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (jogando) {
    //add pontos para jogador atual
    scores[playerAtivo] += pontos;
    document.getElementById(`score--${playerAtivo}`).textContent =
      scores[playerAtivo];

    //checar os pontos >=100
    if (scores[playerAtivo] >= 100) {
      dadoEl.classList.add('hidden');

      jogando = false;
      document
        .querySelector(`.player--${playerAtivo}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${playerAtivo}`)
        .classList.remove('player--active');
    } else {
      //finalizar o jogo ou trocar de jogador
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initGame);
