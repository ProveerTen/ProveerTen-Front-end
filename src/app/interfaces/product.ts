export default interface product {
    id_product?: string,
    name_product: string,
    description_product: string,
    purchase_price_product: number,
    unit_purchase_price_product: number,
    suggested_unit_selling_price_product: number,
    purchase_quantity: number,
    stock_product: number,
    content_product: string,
    image_product: string,
    availability_product: string,
    fk_product_nit_company?: string,
    categories?: any[]
}