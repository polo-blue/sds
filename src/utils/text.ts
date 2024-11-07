
import i18next, { t } from "i18next";

// import { t } from "i18next";

export const getTranslation = (translationKey:string) => {
    // console.log('search translation for', translationKey, t(translationKey))
    return i18next.exists(translationKey) ? t(translationKey) : `missing ${translationKey}`
}

export const text2paragraphs = (text:string, firstLineBottomMargin:boolean=false) => {
    // return '<p class="mb-2">' + text.split(/[\n\r]+/g).join('</p><p>') + '</p>'
    let out = '<p' + (firstLineBottomMargin ? 'class="mb-3"' : '') + '>' + text.split("\n").join('</p><p>') + '<\/p>';
    return out.split('<p><\/p><p>').join('<p class="mt-3">');
}


export const getShorterDescription = (description: string) => {
    function cutString(s:string, n:number) {
      if (s && s.length > 150) {
        const text = s.replace(/(\n)/g," ")
        const cut = text.indexOf('. ', n);
        if (cut ==  -1) return text;
        return `${text.substring(0, cut)}.`
      } else {
        return s || ''
      }
    }
  
    return cutString(description, 150) || ''
  }
  
  export const countWords = (str: string) => {
    return str.trim().split(/\s+/).length;
  }
  
  export const firstSentence = (str: string) => {
    return str.split('\.');
  }

  export const removeSemicolon = (name: string) => {
    return name.replace(';', '')
  }