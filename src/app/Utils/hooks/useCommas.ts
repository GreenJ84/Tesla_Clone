export const useCommas = (num: number): string => {
    let st = num.toString()
    let step = 0
    let i;
    if (st[st.length - 3] !== ".") {
        i = st.length-1
    }
    else {
        i = st.length-4
    }
    for (i; i > -1; i--){
        step++;
        if (step % 3 === 0 && i !== 0) {
            st = st.slice(0, i) + ','+ st.slice(i, st.length)
        }
    }
    return st
}