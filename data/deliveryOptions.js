import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
];

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach(option => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOptions[0];
}

export function formatDeliveryDate(deliveryOption){

    const deliveryDate = skipWeekends(deliveryOption.deliveryDays);

    // const deliveryDate = today.add(
    //     deliveryOption.deliveryDays,
    //     'days'
    // );
    
    const dateString = deliveryDate.format(
        'dddd, MMMM D'
    );

    return dateString;
}

function skipWeekends(deliveryDays){
    
    let date = dayjs();
    // console.log(todayDay);

    let deliveryDate;
    let count = deliveryDays;
    
    while(count > 0){

        deliveryDate = date.add(1, 'days');
        date = deliveryDate;

        if(date.format('dddd') === 'Saturday' || date.format('dddd') === 'Sunday'){
            continue;
        } else {
            count--;
        }
    }

    // console.log(deliveryDate.format('dddd'));
    return deliveryDate;
}
