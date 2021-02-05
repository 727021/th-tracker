export const ISODate: RegExp = /^\d{4}-\d{2}-\d{2}$/
export const hasLetters = ({
    min,
    max
}: { min?: number; max?: number } = {}): RegExp => {
    let num = '1,'
    if (min && max) {
        if (min > max) {
            let t = min
            min = max
            max = t
        }
        num = `${min},${max}`
    } else if (min || max) num = `${min || ''},${max || ''}`

    return new RegExp(`[A-Za-z]{${num}}`)
}
