import React from 'react';

export default function premiumSticker(customer) {
  return customer.isGold ? <i style={{color: "green"}} className="fa fa-check-circle"/> : <i style={{color: "DarkRed"}} className="fa fa-times-circle"/>;
}
