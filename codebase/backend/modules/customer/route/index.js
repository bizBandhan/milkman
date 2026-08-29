/*
/api/v1/customer:
    GET: 
        name
        address
        member:
            name
            phone
        subscription:
            product
            quantitiy
            slot
            unitPrice
    PUT:
        1. check user.phone in userdb
        2. add user.name if not present
        3. create subscription 
/api/v1/customer/_id:
    GET:
        name
        address
        members:
            - name
            phone
        subscription:
            - product
            quantity
            slot
            unit price
            start date
*/