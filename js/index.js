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
        for (var i = 0; i < this.uiGoods.length; i++) {
            sum += this.uiGoods[i].getTotalPrice()
        }
        return sum.toFixed(2)
    }
    increase(index) {
        this.uiGoods[index].increase()
    }
    decrease(index) {
        this.uiGoods[index].decrease()
    }
    getTotalSelectedNumber() {
        var sum = 0
        for (var i = 0; i < this.uiGoods.length; i++) {
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
    getAddtionAmoutForDelivery() {
        return Math.round(this.deliveryThreshold - this.getTotalPrice())
    }
}

class UI {
    constructor() {
        this.store = new UIStore()
        this.doms = {
            goodsContainer: document.querySelector('.goods-list'),
            cartTotalNumberSpan: document.querySelector('.footer-car-total'),
            deliveryLabelDiv: document.querySelector('.footer-car-tip'),
            footerPayDiv: document.querySelector('.footer-pay'),
            footerCarDiv: document.querySelector('.footer-car'),
            footerCarBadge: document.querySelector('.footer-car-badge'),
            addToCartDiv: document.querySelector('.add-to-car')
        }
        const rect = this.doms.footerCarDiv.getBoundingClientRect()
        this.targetLocation = {
            x: rect.x + rect.width * 0.5,
            y: rect.y + rect.height * 0.2
        }
        this.createHtml()
        this.addClickEvent()
        this.updateFooterStyle()
        this.addEventListener()
    }
    addEventListener() {
        this.doms.footerCarDiv.addEventListener('animationend', function () {
            this.classList.remove('animate')
        })
    }
    createHtml() {
        var html = ''
        for (var i = 0; i < this.store.uiGoods.length; i++) {
            var uiGood = this.store.uiGoods[i]
            html += `<div class="goods-item">
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
                  <i index=${i} class="iconfont i-jianhao"></i>
                  <span>${uiGood.selectedNumber}</span>
                  <i index=${i} class="iconfont i-jiajianzujianjiahao"></i>
                </div>
              </div>
            </div>
          </div>`
        }
        this.doms.goodsContainer.innerHTML = html
    }
    addClickEvent() {
        this.doms.goodsContainer.addEventListener('click',(event)=>{
            const element = event.target
            if (element.classList.contains('i-jiajianzujianjiahao')) {
                const index = element.getAttribute('index')
                this.increase(index)
            }else if (element.classList.contains('i-jianhao')) {
                const index = element.getAttribute('index')
                this.decrease(index)
            }
        })
    }
    increase(index) {
        this.store.increase(index)
        this.updateGoodItemStyle(index)
        this.updateFooterStyle()
        this.iconButtonAnimation(index)
    }
    decrease(index) {
        this.store.decrease(index)
        this.updateGoodItemStyle(index)
        this.updateFooterStyle()
        this.iconButtonAnimation(index)
    }
    updateGoodItemStyle(index) {
        const uiGood = this.store.uiGoods[index]
        const goodItemElement = this.doms.goodsContainer.children[index]
        if (uiGood.isSelected()) {
            goodItemElement.classList.add('active')
        } else {
            goodItemElement.classList.remove('active')
        }
        const numberSpanElement = goodItemElement.querySelector('.goods-btns span')
        numberSpanElement.textContent = uiGood.selectedNumber
    }
    updateFooterStyle() {
        this.doms.cartTotalNumberSpan.textContent = this.store.getTotalPrice()
        this.doms.deliveryLabelDiv.textContent = `配送费￥${this.store.deliveryPrice}`
        if (this.store.deliveryable()) {
            this.doms.footerPayDiv.classList.add('active')
        } else {
            this.doms.footerPayDiv.classList.remove('active')
            const footerPaySpan = this.doms.footerPayDiv.querySelector('span')
            footerPaySpan.textContent = `还差￥${this.store.getAddtionAmoutForDelivery()}元起送`
        }
        if (this.store.cartIsEmpty()) {
            this.doms.footerCarDiv.classList.remove('active')
        } else {
            this.doms.footerCarDiv.classList.add('active')
            this.doms.footerCarBadge.textContent = this.store.getTotalSelectedNumber()
        }
    }
    addAnimationToCart() {
        this.doms.footerCarDiv.classList.add('animate')
    }
    iconButtonAnimation(index) {
        const div = document.createElement('div')
        div.className = 'add-to-car'
        const i = document.createElement('i')
        i.className = 'iconfont i-jiajianzujianjiahao'
        div.append(i)
        const plusButton = this.doms.goodsContainer.children[index].querySelector('.i-jiajianzujianjiahao')
        const originRect = plusButton.getBoundingClientRect()

        div.style.transform = `translateX(${originRect.x}px`
        i.style.transform = `translateY(${originRect.y}px)`
        document.body.append(div)
        div.clientHeight
        div.style.transform = `translate(${this.targetLocation.x}px`
        i.style.transform = `translateY(${this.targetLocation.y}px)`
        const that = this
        div.addEventListener('transitionend', function () {
            this.remove()
            that.addAnimationToCart()
        }, {
            once: true
        })
    }
}

new UI()