import "./productsAndSolutions.css";
import { Button, useMediaQuery } from "@mui/material";
import {
  ICorouselImage,
  IProductContent,
  IProductsAndSolutionDetails,
} from "./productsAndSolutions.interface";
import {
  getCorouselImages,
  getProducts,
  getProductsCategories,
} from "../../util/productsManagerService";
import { useDebounce } from "use-debounce";
import { useContext, useEffect, useState } from "react";
import { Grid, InputBase } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import SearchIcon from "@mui/icons-material/Search";
import defaultImage from "../../assets/grey_background.jpg";
import { LoadingSpinner } from "../../core/loader/LoadingSpinner";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { CustomDropDown } from "../../core/customDropdown/customDropdown.component";
import React from "react";
import { useHistory } from "react-router-dom";
import { MobileDisplayContext } from "../../context/MobileDisplayContext";

export const ProductsAndSolutions = ({
  isLoading = true,
  isTesting = false,
  productsData = [],
  carouselData = [],
}: IProductsAndSolutionDetails) => {
  const history = useHistory();

  const [screenWidth, setScreenWidth] = React.useState<number>(
    window.innerWidth
  );
  const isMobileScreen = useMediaQuery("(max-width:1199px)");
  const isSmallMobileScreen = useMediaQuery("(max-width:600px)");

  const [showLoader, setShowLoader] = React.useState<boolean>(isLoading);
  const [showProductLoader, setShowProductLoader] = useState<boolean>(false);

  const [corouselImages, setCorouselImages] =
    useState<ICorouselImage[]>(carouselData);
  const [isTabletScreen, setIsTabletScreen] = useState(false);

  const [searchInput, setSearchInput] = useState<string>("");
  const [searchedInput, setSearchedInput] = useState<string>("");
  const [debouncedText] = useDebounce(searchInput, 500);

  const [selectedCategoryCode, setSelectedCategoryCode] = useState<
    string | null
  >(null);
  const [categories, setCategories] = useState([]);
  const [categoriesText, setCategoriesText] = useState([]);
  const [products, setProducts] = useState<IProductContent[]>(productsData);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState<number>(16);
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<any[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<any[]>([]);
  useEffect(() => {
    const handleResize = () => {
      setIsTabletScreen(window.innerWidth >= 926 && window.innerWidth <= 1200);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getProductAndSolutionDetails = async () => {
    await Promise.all([
      fetchCorouselImages(),
      fetchDropDownContent(),
      fetchProducts(
        debouncedText,
        selectedCategoryCode ?? "",
        selectedPage,
        productsPerPage,
        true
      ),
    ]);
    setShowLoader(false);
  };

  const fetchCorouselImages = async () => {
    try {
      const data = await getCorouselImages();
      if (data.succeeded) {
        const carousel = data.item.carousel;
        const carouselImages: ICorouselImage[] = carousel.image.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );

        setCorouselImages(carouselImages);

        return carouselImages;
      }
      return [];
    } catch (error) {
      console.log("error", error);
      return [];
    }
  };

  const fetchDropDownContent = async () => {
    try {
      const data = await getProductsCategories();
      if (data.items.length > 0) {
        setCategories(data.items);
        setCategoriesText(data.items.map((x: { name: string }) => x.name));
        if (data.items.length > 0) {
          const codeForFirstCategory = data.items[0];
          setSelectedCategoryCode(codeForFirstCategory.code);
        }
        return data.items;
      }
    } catch (error) {
      console.log("error", error);
      return [];
    }
  };

  const fetchProducts = async (
    searchString: string,
    category: string,
    currentPage: number,
    perPageCount: number,
    isShowLoader?: boolean
  ) => {
    const reqBody = {
      searchInput: searchString,
      categoryCode: category,
      pageIndex: Number(currentPage),
      pageItemCount: Number(perPageCount),
    };
    try {
      if (!isShowLoader) {
        setShowProductLoader(true);
      }
      if (currentPage !== selectedPage) {
        setSelectedPage(currentPage);
      }
      setSearchedInput(debouncedText);
      const data = await getProducts(reqBody);
      if (data && data.succeeded) {
        setTotalProductsCount(data.item.totalCount);
        setProducts([...data.item.productList]);
      } else {
        setTotalProductsCount(0);
        setProducts([]);
      }
      if (!isShowLoader) {
        setShowProductLoader(false);
      }
      return [];
    } catch (error) {
      console.log("error", error);
      setShowProductLoader(false);
      return [];
    }
  };

  const handleClickOpen = (product?: IProductContent) => {
    let selectedProduct: IProductContent | undefined = product;
    if (!selectedProduct) {
      selectedProduct = {
        code: "TEGSF",
        id: 59,
        name: "3M™ Tegaderm™ Silicone Foam",
        imageUrl:
          "https://multimedia.3m.com/mws/media/1434922Y/3m-tegaderm-silicone-foam-dressing-sell-sheet-dressings.jpg",
        productUrl: "https://www.3m.com/3M/en_US/p/d/hcbgebm20037/",
        sku: "3M™ Tegaderm™ Silicone Foam",
        allowOrder: "3ME",
        allowSample: "3ME",
        productType: "Dressing",
      };
    }
    window.scrollTo(0, 0);
    history.push({
      pathname: "/productsAndSolutions/productDetail",
      state: {
        product: selectedProduct,
      },
    });
  };

  const handleProductPerPageValue = (e: any) => {
    e.preventDefault();
    setProductsPerPage(e.target.value);
    if (products.length > 0) {
      fetchProducts(
        debouncedText,
        selectedCategoryCode ?? "",
        totalProductsCount > e.target.value ? selectedPage : 1,
        e.target.value
      );
    }
  };

  const previousButtonAction = () => {
    let previousPage = selectedPage <= 1 ? selectedPage : selectedPage - 1;
    fetchProducts(
      debouncedText,
      selectedCategoryCode ?? "",
      previousPage,
      productsPerPage
    );
  };

  const nextButtonAction = () => {
    let nextPage =
      selectedPage >= numberOfPages.length ? selectedPage : selectedPage + 1;
    fetchProducts(
      debouncedText,
      selectedCategoryCode ?? "",
      nextPage,
      productsPerPage
    );
  };

  const changePageNumber = (newPage: number) => {
    fetchProducts(
      debouncedText,
      selectedCategoryCode ?? "",
      newPage,
      productsPerPage
    );
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const re = /^[a-zA-Z0-9- ]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSearchInput(e.target.value);
    }
  };

  const validateAndSetData = (e: any) => {
    const categoryCode = getCodeFromName(categories, e.target.value);
    setSelectedCategoryCode(categoryCode);
    fetchProducts(debouncedText, categoryCode, 1, productsPerPage);
  };

  const updatePaginationDetails = () => {
    let howManyPages = Math.ceil(totalProductsCount / productsPerPage);
    if (howManyPages === 0) {
      howManyPages = 1;
    }
    const numberOfPages: number[] = [];
    for (let i = 1; i <= howManyPages; i++) {
      numberOfPages.push(i);
    }
    setNumberOfPages(numberOfPages);
    var tempNumberOfPages: (string | number)[] = [];
    tempNumberOfPages = [...pageNumbers];
    let dotsInitial: any = "...";
    let dotsRight: any = " ...";
    if (numberOfPages.length < 5) {
      tempNumberOfPages = numberOfPages;
    } else if (selectedPage >= 1 && selectedPage < 5) {
      tempNumberOfPages = [1, 2, 3, 4, 5, dotsInitial, numberOfPages.length];
    } else if (
      selectedPage >= 5 &&
      selectedPage <= Number(numberOfPages.length)
    ) {
      const sliced1 = numberOfPages.slice(selectedPage - 1, selectedPage);
      const sliced2 = numberOfPages.slice(selectedPage, selectedPage + 4);
      tempNumberOfPages = [
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ];
    } else if (
      selectedPage >= Number(numberOfPages.length) - 6 &&
      selectedPage < Number(numberOfPages.length) - 1
    ) {
      const sliced1 = numberOfPages.slice(selectedPage - 1, selectedPage);
      const sliced2 = numberOfPages.slice(selectedPage, selectedPage + 3);
      tempNumberOfPages = [
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length,
      ];
    } else if (selectedPage === dotsInitial) {
      setSelectedPage(pageNumbers[pageNumbers.length - 3] + 1);
    } else if (selectedPage === dotsRight) {
      setSelectedPage(pageNumbers[pageNumbers.length - 3] + 1);
    }
    setPageNumbers(tempNumberOfPages);
  };

  const getNameFromCode = (array: never[], code: string): string => {
    if (array.length === 0 || code === null) {
      return code;
    }
    if (Array.isArray(array)) {
      let output = array
        .filter((item: { name: string; code: string }) => item.code === code)
        .map((x: { name: string }) => x.name)[0];
      return output ? output : code;
    }
    return code;
  };

  const getCodeFromName = (array: never[], input: string): string => {
    if (array.length === 0) {
      return "";
    }
    if (Array.isArray(array)) {
      return array
        .filter((item: { name: string; code: string }) => item.name === input)
        .map((x: { code: string }) => x.code)[0];
    }
    return input;
  };

  const widthResizer = () => {
    if (!isTesting) {
      var width = window.innerWidth;
      setScreenWidth(width);
    }
  };

  useEffect(() => {
    if (!isTesting) {
      window.scrollTo(0, 0);
      getProductAndSolutionDetails();
      // Getting the width of the browser whenever the screen resolution changes.
      window.addEventListener("resize", widthResizer);
      // Getting the width of the browser on load
      widthResizer();
      // 👇️ Remove the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", widthResizer);
      };
    }
  }, []);

  useEffect(() => {
    if (
      (debouncedText.length === 0 && searchedInput !== debouncedText) ||
      debouncedText.length >= 3
    ) {
      fetchProducts(
        debouncedText,
        selectedCategoryCode ?? "",
        1,
        productsPerPage
      );
    }
  }, [debouncedText]);

  useEffect(() => {
    updatePaginationDetails();
  }, [JSON.stringify(pageNumbers), JSON.stringify(products)]);

  return (
    <>
      <div className="productsAndSolutions-main-component">
        {showLoader ? (
          <div className="products-and-solution-loader">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <Grid
              item
              className="carousel-grid-container"
              xs={isMobileScreen ? 8 : 4}
            >
              {corouselImages && corouselImages?.length > 0 && (
                <Carousel
                  className="carousel-images-dot"
                  data-testid="carousel-image-and-text"
                  indicatorIconButtonProps={{
                    style: {
                      color: "#1E64D0",
                      opacity: "0.25",
                      cursor: "pointer",
                      height: "50px",
                    },
                  }}
                  activeIndicatorIconButtonProps={{
                    style: {
                      color: "#1E64D0",
                      opacity: 1,
                      cursor: "pointer",
                    },
                  }}
                  stopAutoPlayOnHover={false}
                  interval={8000}
                  changeOnFirstRender={false}
                  navButtonsAlwaysInvisible={true}
                  indicators={true}
                  height={
                    isSmallMobileScreen
                      ? "160px"
                      : (screenWidth * 0.75 - 48) * 0.375
                  }
                >
                  {corouselImages?.map((item: ICorouselImage, i: number) => (
                    <>
                      <div key={i} className="">
                        <img
                          src={item.imageLink}
                          alt="img"
                          data-testid={`carousel-poster`}
                          style={{
                            height: isSmallMobileScreen
                              ? "160px"
                              : (screenWidth * 0.75 - 48) * 0.375,
                            width: "100%",
                          }}
                        />
                      </div>
                      <p
                        className="carousel-text"
                        data-testid={`carousel-text-${i}`}
                      >
                        {item.text}
                        <span
                          className="view-product-information-button"
                          onClick={() => handleClickOpen()}
                        >
                          <h4
                            className="view-product-information-button-text"
                            data-testid={`carousel-button-text-${i}`}
                          >
                            {item.buttonText}
                          </h4>
                        </span>
                      </p>
                    </>
                  ))}
                </Carousel>
              )}
            </Grid>
            <div className="productsAndSolutions-products-section">
              <h2
                className="productsAndSolutions-header"
                data-testId="productsAndSolutions-header-text"
              >
                Products
              </h2>
              <Grid
                className="products-and-solutions-container"
                container
                spacing={1}
              >
                <Grid
                  className="product-grid-item"
                  item
                  xs={isMobileScreen ? 12 : 6}
                >
                  <div className="product-library-searchbar">
                    <div className="search-icon-div">
                      <SearchIcon className="search-icon" />
                    </div>
                    <InputBase
                      className="product-library-search-input"
                      data-testid="product-library-search-input"
                      name="search-input"
                      onChange={handleSearch}
                      placeholder="Search by product name or SKU"
                      value={searchInput}
                    />
                  </div>
                </Grid>
                <Grid
                  className="product-grid-item"
                  item
                  xs={isMobileScreen ? 12 : 4}
                >
                  <div className="product-library-category">
                    <CustomDropDown
                      handleChange={validateAndSetData}
                      menuItem={categoriesText}
                      name="product-library-category"
                      placeHolder="Show all product categories"
                      selectpropsClassName={
                        selectedCategoryCode !== null
                          ? "product-library-category-select"
                          : "placeHolder"
                      }
                      selectClassName={
                        selectedCategoryCode !== null
                          ? "product-library-category-input"
                          : "placeHolder"
                      }
                      testId="product-library-category"
                      value={
                        selectedCategoryCode !== null
                          ? getNameFromCode(categories, selectedCategoryCode)
                          : null
                      }
                    />
                  </div>
                </Grid>
              </Grid>
              {showProductLoader ? (
                <div className="products-loader">
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  <Grid
                    className={
                      isMobileScreen
                        ? "products-mobile-grid-container"
                        : "products-grid-container"
                    }
                    container
                  >
                    {products.length > 0 ? (
                      products.map(
                        (product: IProductContent, index: number) => {
                          return (
                            <Grid
                              className="product-grid-item"
                              data-testid={product.id}
                              item
                              key={product.id}
                              onClick={() => handleClickOpen(product)}
                              xs={isMobileScreen ? 12 : 3}
                            >
                              <div
                                className={`product-item-box ${
                                  (index + 1) % 4 === 1
                                    ? "left"
                                    : (index + 1) % 4 === 0
                                    ? "right"
                                    : "center"
                                }`}
                              >
                                <img
                                  alt={defaultImage}
                                  className="product-poster"
                                  data-testid={`product-poster-${index}`}
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = defaultImage;
                                  }}
                                  src={product.imageUrl}
                                />
                                <div className="product-text">
                                  <h4
                                    className="product-name"
                                    data-testid={`product-product-${index}`}
                                  >
                                    {product.name}
                                  </h4>
                                </div>
                              </div>
                            </Grid>
                          );
                        }
                      )
                    ) : (
                      <div className="no-data-found">No Data found</div>
                    )}
                  </Grid>
                </>
              )}
            </div>
            <div className="pagination-div">
              <div
                className="product-itemsPerPage"
                data-testid="product-itemsPerPage"
              >
                <p className="ptag">Items per page:</p>
                <CustomDropDown
                  handleChange={handleProductPerPageValue}
                  menuItem={["16", "32", "48"]}
                  selectClassName="product-dropdown"
                  selectpropsClassName="dropDown"
                  paperPropsClassName="pagination-dropdown"
                  value={`${productsPerPage}`}
                />
              </div>
              <div
                className="product-totalCounts"
                data-testid="product-totalCounts"
              >
                <p className="products-item-desc">{`${
                  totalProductsCount === 0
                    ? 0
                    : (selectedPage - 1) * productsPerPage + 1
                }-${
                  selectedPage * productsPerPage < totalProductsCount
                    ? selectedPage * productsPerPage
                    : totalProductsCount
                } of ${totalProductsCount} items`}</p>
              </div>
              <div
                className={
                  pageNumbers.length === 2 || pageNumbers.length === 1
                    ? "pagination-table pagination-table-single"
                    : "pagination-table"
                }
                data-testid="paginationTablePresent"
              >
                <Button
                  classes={{
                    root: `page-number-button${
                      selectedPage === 1 ? " disabled" : ""
                    }`,
                  }}
                  data-testid="previous-button"
                  disabled={selectedPage === 1}
                  onClick={previousButtonAction}
                  variant="text"
                >
                  <IoMdArrowDropleft size={20} />
                </Button>
                {Array.isArray(pageNumbers) &&
                  pageNumbers.map((page, index) => {
                    return (
                      <Button
                        classes={{
                          root: `page-number-button${
                            selectedPage === page ? " active" : ""
                          }`,
                        }}
                        data-testid="page-number-button"
                        key={index}
                        onClick={() => {
                          if (selectedPage !== page) {
                            if (isNaN(parseInt(page))) {
                              changePageNumber(page);
                            } else {
                              changePageNumber(page);
                            }
                          }
                        }}
                        variant="text"
                      >
                        {page}
                      </Button>
                    );
                  })}
                <Button
                  classes={{
                    root: `page-number-button${
                      selectedPage === numberOfPages.length ? " disabled" : ""
                    }`,
                  }}
                  data-testid="next-button"
                  disabled={selectedPage === numberOfPages.length}
                  onClick={nextButtonAction}
                  variant="text"
                >
                  <IoMdArrowDropright size={20} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
