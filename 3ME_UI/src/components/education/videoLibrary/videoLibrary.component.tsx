import "./videoLibrary.css";
import {
  CMS_EDUCATION_VIDEO_LIBRARY,
  DD_EDUCATION_VIDEO_CATEGORIES,
} from "../../../util/staticText";
import {
  getCodeFromText,
  getTextFromCode,
} from "../../../util/utilityFunctions";
import { useDebounce } from "use-debounce";
import { useContext, useEffect, useState } from "react";
import { format } from "react-string-format";
import { Grid, InputBase } from "@mui/material";
import playIcon from "../../../assets/playIcon.svg";
import SearchIcon from "@mui/icons-material/Search";
import { getCMSContent } from "../../../util/cmsService";
import defaultImage from "../../../assets/grey_background.jpg";
import VideoDialog from "../../helpAndSupport/faq/VideoDialog";
import { getdropDownContent } from "../../../util/dropDownService";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { IMainSection } from "../../helpAndSupport/faq/mainSection.interface";
import { Navigator } from "../../helpAndSupport/Navigator/navigator.component";
import { IVideoContent } from "../../helpAndSupport/faq/videoContent.interface";
import { IVideoSection } from "../../helpAndSupport/faq/videoSection.interface";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import { MobileDisplayContext } from "../../../context/MobileDisplayContext";
type Props = {
  isLoading?: boolean;
  mainSectionData?: IMainSection;
  allVideos?: IVideoContent[];
  videoSection?: IVideoSection;
};
export const VideoLibrary = ({
  isLoading = true,
  mainSectionData = undefined,
  allVideos = [],
  videoSection = undefined,
}: Props) => {
  const [videoTutorialSection, setVideoTutorialSection] = useState<
    IVideoSection | undefined
  >(videoSection);
  const [videos, setVideos] = useState<Array<IVideoContent>>();
  const [mainSection, setMainSection] = useState<IMainSection | undefined>(
    mainSectionData
  );
  const [isTabletScreen, setIsTabletScreen] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchedInput, setSearchedInput] = useState<string>("");
  const [debouncedText] = useDebounce(searchInput, 500);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState([]);
  const [categoriesText, setCategoriesText] = useState([]);
  const [showLoader, setShowLoader] = useState<boolean>(isLoading);
  const [video, setVideo] = useState<IVideoContent>();
  const [open, setOpen] = useState(false);
  const { isMobileScreen } = useContext(MobileDisplayContext);
  const validateAndSetData = (e: any) => {
    let category = getCodeFromText(categories, e.target.value);
    setSelectedCategory(category);
    filterVideos(debouncedText, category);
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const re = /^[a-zA-Z0-9- ]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSearchInput(e.target.value);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsTabletScreen(window.innerWidth >= 320 && window.innerWidth <= 912);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filterVideos = (searchParam: string, category: string) => {
    setSearchedInput(searchParam);
    let searchCategory = "";
    if (category !== "1") {
      searchCategory = getTextFromCode(categories, category);
    }
    if (videoTutorialSection && videoTutorialSection.videos) {
      let filtedVideos = videoTutorialSection.videos;
      if (searchCategory.length > 0) {
        filtedVideos = filtedVideos.filter(
          (video: IVideoContent) =>
            video.category?.toLocaleLowerCase() === searchCategory.toLowerCase()
        );
      }
      if (searchParam.length > 0) {
        filtedVideos = filtedVideos.filter((video: IVideoContent) =>
          video.text.toLowerCase().includes(searchParam.toLowerCase())
        );
      }
      setVideos(filtedVideos);
    }
  };

  const handleClickOpen = (video: any) => {
    setVideo(video);
    setOpen(true);
  };

  const getVideoLibraryDetails = async () => {
    const result = await Promise.all([
      fetchFAQVideoContent(),
      fetchDropDownContent(),
    ]);
    let categoriesData = result[1];
    if (categoriesData.length > 0) {
      setSelectedCategory("1");
    }
    setShowLoader(false);
  };

  const fetchFAQVideoContent = async () => {
    try {
      const data = await getCMSContent(CMS_EDUCATION_VIDEO_LIBRARY);
      if (data.item !== undefined) {
        setMainSection(data.item.main);
        setVideoTutorialSection(data.item.library);
      }
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const fetchDropDownContent = async () => {
    try {
      const ddContent = format("{0}", DD_EDUCATION_VIDEO_CATEGORIES);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const categoriesObject = data.items.filter(
          (item: { name: string }) =>
            item.name === DD_EDUCATION_VIDEO_CATEGORIES
        );
        const categoriesData = categoriesObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setCategories(categoriesData);
        setCategoriesText(categoriesData.map((x: { text: string }) => x.text));
        return categoriesData;
      }
    } catch (error) {
      console.log("error", error);
      return [];
    }
  };

  useEffect(() => {
    setSearchInput("");
    window.scrollTo(0, 0);
    getVideoLibraryDetails();
  }, []);

  useEffect(() => {
    if (
      (debouncedText.length === 0 && searchedInput !== debouncedText) ||
      debouncedText.length > 0
    ) {
      filterVideos(debouncedText, selectedCategory);
    }
  }, [debouncedText]);

  useEffect(() => {
    filterVideos(debouncedText, "1");
  }, [videoTutorialSection]);

  return (
    <>
      <div
        className="education-video-library"
        data-testid="education-video-library"
      >
        {showLoader ? (
          <div className="education-video-library-loader">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <Navigator
              array={[
                {
                  route: "/Education",
                  pageName: "Education",
                },
              ]}
              className="education-video-library-route-section"
              title="Video Library"
            />
            <div className="education-video-library-main-section">
              <div className="main-section-image-div">
                <img
                  className="main-section-image"
                  data-testid="main-section-image"
                  src={mainSection?.video?.poster}
                  alt=""
                />
                <div className="main-section-image-fullframe"></div>
                <div className="main-section-image-partialframe"></div>
              </div>
              <div className="main-section-title">
                <h2
                  className="main-section-watch-text"
                  data-testid="main-section-watch-text"
                >
                  {mainSection?.title}
                </h2>
                <div
                  className="main-section-watch-button"
                  onClick={() => handleClickOpen(mainSection?.video)}
                >
                  <img
                    alt={defaultImage}
                    className="main-section-watch-button-icon"
                    data-testid="main-section-watch-button-icon"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = defaultImage;
                    }}
                    src={playIcon}
                  />
                  <h4
                    className="main-section-watch-button-text"
                    data-testid="main-section-watch-button-text"
                  >
                    Watch Now ({mainSection?.video?.duration})
                  </h4>
                </div>
              </div>
            </div>
            <div className="education-video-library-video-tutorials-section">
              <h2
                className="education-video-tutorials-header"
                data-testid="education-video-header-text"
              >
                {videoTutorialSection?.title}
              </h2>
              <Grid
                className="education-video-library-container container-mobile"
                container
                spacing={0}
              >
                <Grid
                  className="education-video-grid-item"
                  item
                  xs={isMobileScreen ? 11 : 6}
                >
                  <div className="education-video-library-searchbar">
                    <div className="search-icon-div">
                      <SearchIcon className="search-icon" />
                    </div>
                    <InputBase
                      className="education-video-library-search-input"
                      data-testid="education-video-library-search-input"
                      name="search-input"
                      onChange={handleSearch}
                      placeholder="Search videos by product, term, or treatment"
                      value={searchInput}
                    />
                  </div>
                </Grid>
                <Grid
                  className="education-video-grid-item"
                  item
                  xs={isMobileScreen ? 11 : 4}
                >
                  <div className={"education-video-library-category"}>
                    <CustomDropDown
                      handleChange={validateAndSetData}
                      menuItem={categoriesText}
                      name="education-video-library-category"
                      placeHolder="Show all videos"
                      selectpropsClassName={
                        selectedCategory
                          ? "education-video-library-category-select"
                          : "placeHolder"
                      }
                      selectClassName={
                        selectedCategory
                          ? "education-video-library-category-input"
                          : "placeHolder"
                      }
                      testId="education-video-library-category"
                      value={
                        selectedCategory
                          ? getTextFromCode(categories, selectedCategory)
                          : null
                      }
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid className="education-video-library-container" container>
                {videos &&
                  videos.map((video, index) => {
                    return (
                      <Grid
                        className="education-video-grid-item"
                        data-testid={video.videoId.toString()}
                        item
                        key={video.videoId.toString()}
                        onClick={() => handleClickOpen(video)}
                        xs={isMobileScreen ? 12 : isTabletScreen ? 12 : 4}
                      >
                        <div
                          className={`education-video-box ${
                            (index + 1) % 3 === 1
                              ? "left"
                              : (index + 1) % 3 === 2
                              ? "center"
                              : "right"
                          } videoBoxMobile`}
                        >
                          <img
                            alt={defaultImage}
                            className="education-video-poster"
                            data-testid={`education-video-poster-${index}`}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = defaultImage;
                            }}
                            src={video.poster}
                          />
                          <div className="education-video-text">
                            <h4
                              className="education-video-product"
                              data-testid={`education-video-product-${index}`}
                            >
                              {video.category}
                            </h4>
                            <h4
                              className="education-video-name"
                              data-testid={`education-video-name-${index}`}
                            >
                              {video.text} ({video.duration})
                            </h4>
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
              </Grid>
            </div>
          </>
        )}
      </div>
      {video && (
        <VideoDialog
          accountId={video.accountId}
          duration={video.duration}
          open={open}
          setOpen={setOpen}
          text={video.text}
          videoId={video.videoId}
        />
      )}
    </>
  );
};
