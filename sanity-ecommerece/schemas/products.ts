export default{
    name: 'ProductLine',
    title: 'ProductLine',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'image Title',
            type: 'array',
            of: [{type: 'image'}],
            options: {
                hotspot: true,

            },
            
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options:{
                source: 'name',
                maxLength: 90,
            }

        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string'
        },
        {
            name: 'banner',
            title: 'Banner',
            type: 'boolean',
            description: 'Set True to be main product'
        }
    ]
}
