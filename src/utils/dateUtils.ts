export const todayKey = () => new Date().toISOString().slice(0, 10);

export const formatDate = (date: string) => {
  const d = new Date(`${date}T00:00:00`);
  return `${d.getMonth() + 1}/${d.getDate()}`;
};

export const uid = (prefix = 'id') => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
