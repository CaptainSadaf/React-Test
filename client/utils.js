export const createdDaysAgo = (productDate) => {
    const now = new Date();
    const timeDiff = now.getTime() - productDate.getTime();
    const dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDifference;
}

export const formatDateToCreaTellaDate = date => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + (date.getDate())).slice(-2);
    return `${year}-${month}-${day}`
}

export const mapProducts = products => products.map(product => {
    const createdAgo = createdDaysAgo(new Date(product.date));
    const date = createdAgo > 7 ? formatDateToCreaTellaDate(new Date(product.date)) : `${createdAgo} days ago`;
    return {
        ...product,
        date: date
    }
})