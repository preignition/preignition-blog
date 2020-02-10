import { css } from 'lit-element';

const cardStyles = css `
.card {
  border-radius: 8px;
  display: block;
  min-height: auto;
  overflow: hidden;
  position: relative;
  transition: box-shadow .2s;
  min-height: auto;

}

.card:hover,
.card:focus,
.card:active {
  background-color: transparent;
  outline: none;
  text-decoration: none;
}

.card::after {
    content: '';
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: background-color .2s,border .2s;
    z-index: 1;
}

.card:hover {
  box-shadow:
    0 2px 4px -1px rgba(0, 0, 0, .2),
    0 4px 5px 0 rgba(0, 0, 0, .14),
    0 1px 10px 0 rgba(0, 0, 0, .12);
}

.card:hover::after {
  background-color: rgba(32, 33, 36, .0);
}

.card:focus {
  box-shadow:
    0 2px 4px -1px rgba(0, 0, 0, .2),
    0 4px 5px 0 rgba(0, 0, 0, .14),
    0 1px 10px 0 rgba(0, 0, 0, .12);
  outline: none;
}

.card:focus::after {
  background-color: rgba(32, 33, 36, .04);
}

.card:active {
  box-shadow:
    0 8px 10px -5px rgba(0, 0, 0, .2),
    0 16px 24px 2px rgba(0, 0, 0, .14),
    0 6px 30px 5px rgba(0, 0, 0, .12);
  outline: none;
}

.card:active::after {
  background-color: rgba(32, 33, 36, .08);
}

.card--raised {
  box-shadow:
    0 1px 2px 0 rgba(60, 64, 67, .3),
    0 1px 3px 1px rgba(60, 64, 67, .15);
}
  

  `;

export default cardStyles;
