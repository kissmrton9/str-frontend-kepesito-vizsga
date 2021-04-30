function changeOuterLinks() {
    const nav = document.querySelector('nav#link-list');
    const aElementList = document.querySelectorAll('nav#link-list a');
    
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.width = '30%';
    nav.style.margin = '0 auto';
    nav.style.border = '1px solid blue';
    nav.style.padding = '16px';

    //Szerintem így lenne helyes, de a teszt hibát adott!!
    
    for(let aElem of aElementList){
        const textContent = aElem.textContent;
        if (textContent.toLowerCase().includes('outer-link')){
            aElem.textContent = '';
            const strong = document.createElement("strong");
            strong.textContent = textContent;
            aElem.appendChild(strong);
            aElem.setAttribute('target','_blank');
        }
    }
    
}

export { changeOuterLinks };