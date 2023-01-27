const BasketThree = () => {
  const datas = [
    {
      url: `https://cdn.pixabay.com/photo/2022/08/09/15/20/tractor-7375252_960_720.jpg`,
    },
    {
      url: `https://cdn.pixabay.com/photo/2022/08/09/15/20/tractor-7375252_960_720.jpg`,
    },
  ];

  return (
    <div className="mt-5 relative  h-32 w-12/12">
      <div>
        <img
          className="absolute top-0 left-0 w-28 h-28"
          src="https://cdn.pixabay.com/photo/2022/08/09/15/20/tractor-7375252_960_720.jpg"
          alt="carousel"
        ></img>

        <div className=" pl-36 h-28 w-full table-cell align-middle">
          <div>
            <div>김치</div>
            <div> 오호zlzl</div>
          </div>
          <p className=" text-right">
            3개
            <strong className="w-36 inline-block">
              2000
              <span>원</span>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasketThree;
