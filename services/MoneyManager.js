

export default class MoneyManager {
  constructor(startingMoney) {
    this.money = startingMoney;
  }

  get currentMoney() {
    return this.money;
  }

  addMoney(newAmount) {
    this.money += newAmount;
  }

  withdrawMoney(amount) {
    this.money = Math.max(0, this.money - amount)
  }

  updateMoney() {
    // Update money amount
    Array.from(document.getElementsByClassName('money_data')).forEach(element => {
      element.innerHTML = this.money;
    });
  }
}