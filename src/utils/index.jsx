export const generateSelectAmount = (amount) => {
  return Array.from({ length: amount }, (_, index) => {
    // Perbaikan: Panggil fungsi callback di dalam Array.from
    const amountValue = index + 1; // Gunakan nama variabel yang tidak berbenturan
    return (
      <option key={amountValue} value={amountValue}>
        {amountValue}
      </option>
    );
  });
};
