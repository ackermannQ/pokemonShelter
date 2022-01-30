namespace backend.RequestHelpers
{
    public class PaginationParams
    {
        public int PageNumber { get; set; } = 1;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }

        private const int MaxPageSize = 20;

        private int _pageSize = 6;
    }
}
