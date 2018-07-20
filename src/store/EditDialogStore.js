import { autorun,observable } from 'mobx'

class EditDialogStore {
    @observable open = false
    @observable text = ''
    @observable sentiment = ''
    @observable intention = ''
    @observable product = ''
    setOpen(isOpen){
        this.open = isOpen
    }
    setText(text){
        this.text = text
    }
    setSentiment(sentiment){
        this.sentiment = sentiment
    }
    setIntention(intention){
        this.intention = intention
    }
    setProduct(product){
        this.product = product
    }

}

var editDialogStore = window.editDialogStore = new EditDialogStore

export default editDialogStore

autorun(()=>{
    console.log(editDialogStore.open)
})