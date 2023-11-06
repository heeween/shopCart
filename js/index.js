class UIGood {
    constructor(g) {
        this.good = g,
        this.selectedNumber = 0
    }
    getTotalPrice() {
        return this.good.price * this.selectedNumber
    }
    isSelected() {
        return this.selectedNumber > 0
    }
    increase() {
        this.selectedNumber++
    }
    decrease() {
        if (this.selectedNumber <= 0) return
        this.selectedNumber--
    }
}

class UIStore {
    constructor() {
        var UIGoods = []
        for (let i = 0; i < goods.length; i++) {
            const uiGood = new UIGood(goods[i])
            UIGoods.push(uiGood)
        }
        this.uiGoods = UIGoods
        this.deliveryThreshold = 30
        this.deliveryPrice = 5
    }
    getTotalPrice() {
        var sum = 0;
        for(var i = 0; i < this.uiGoods.length; i++) {
            sum += this.uiGoods[i].getTotalPrice()
        }
        return sum
    }
    increase(index) {
        this.uiGoods[index].increase()
    }
    decreast(index) {
        this.uiGoods[index].decrease()
    }
    getTotalSelectedNumber() {
        var sum = 0
        for(var i = 0; i < this.uiGoods.length; i++) {
            sum += this.uiGoods[i].selectedNumber
        }
        return sum
    }
    cartIsEmpty() {
        return this.getTotalSelectedNumber() <= 0
    }
    deliveryable() {
        return this.getTotalPrice() >= this.deliveryThreshold
    }
}

class UI {
    constructor() {
        this.store = new UIStore()
        this.doms = {
            goodsContainer:document.querySelector('.goods-list')
        }
        this.createHtml()
    }
    createHtml() {
        var html = ''
        for (var i = 0; i < this.store.uiGoods.length; i++) {
            var uiGood = this.store.uiGoods[i]
            html += `        <div class="goods-item">
            <img src="${uiGood.good.pic}" alt="" class="goods-pic" />
            <div class="goods-info">
              <h2 class="goods-title">${uiGood.good.title}</h2>
              <p class="goods-desc">${uiGood.good.desc}
              </p>
              <p class="goods-sell">
                <span>月售 ${uiGood.good.sellNumber}</span>
                <span>好评率${uiGood.good.favorRate}%</span>
              </p>
              <div class="goods-confirm">
                <p class="goods-price">
                  <span class="goods-price-unit">￥</span>
                  <span>${uiGood.good.price}</span>
                </p>
                <div class="goods-btns">
                  <i class="iconfont i-jianhao"></i>
                  <span>0</span>
                  <i class="iconfont i-jiajianzujianjiahao"></i>
                </div>
              </div>
            </div>
          </div>`
        }
        this.doms.goodsContainer.innerHTML = html
    }
}

const ui = new UI()
console.log(ui);