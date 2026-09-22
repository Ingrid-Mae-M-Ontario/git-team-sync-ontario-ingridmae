function createOrder(items) {
  return {
    items,
    total: items.reduce((sum, i) => sum + i.price * i.qty, 0),
    status: 'pending',
  };
}

function applyDiscount(order, percent) {
  const discounted = order.total * (1 - percent / 100);
  return { ...order, total: discounted };
}

function cancelOrder(order) {
  return { ...order, status: 'cancelled', total: 0 };
}

function calculateLoyaltyPoints(order) {
  // VIP bonus: orders over $100 earn 1.5x points
  // Round instead of truncating for fairer point allocation
  // Minimum floor: every order earns at least 1 point
  let points;
  if (order.total > 100) {
    points = Math.round((order.total / 10) * 1.5);
  } else {
    points = Math.round(order.total / 10);
  }
  return Math.max(points, 1);
}

module.exports = { createOrder, applyDiscount, cancelOrder, calculateLoyaltyPoints };