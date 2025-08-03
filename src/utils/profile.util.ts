const SERVER_URL_IMG = 'https://api-ecom.duthanhduoc.com/images/'

const hiddenEmail = (email: string | undefined) => {
    if (!email) {
        return
    }

    const numberOfVisibleChars = 2
    const emailAt = '@'

    const [address, domain] = email.split(emailAt)
    const visiblePart = address.slice(0, numberOfVisibleChars)
    const hiddenPart = '*'.repeat(Math.max(0, address.length - numberOfVisibleChars))

    return `${visiblePart}${hiddenPart}${emailAt}${domain}`
}

const getAvatarUrl = (name: string | undefined) => {
    return name === SERVER_URL_IMG + 'undefined' ? undefined : name
}

export default { hiddenEmail, getAvatarUrl }
