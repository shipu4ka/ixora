import { FC, useEffect, useState } from "react";
import { uid } from "uid";
import { api } from "../../api";
import { ICarInfo, IWipersParams } from "../../models";
import { EPageType } from "../../enums";
import { wiperTitles } from "../../constants";
import "./WipersPage.css";

export const WipersPage: FC = () => {
  const [contentAuto, setContentAuto] = useState<ICarInfo[]>([]);
  const [contentWipers, setContentWipers] = useState<IWipersParams[]>([]);
  const [pageType, setPageType] = useState("brands");
  const [titlePage, setTitlePage] = useState("Подбор стеклоочистителей");
  const [titleAuto, setTitleAuto] = useState("");
  const [titleModification, setTitleModification] = useState("");
  const [classOptionsOrientation, setClassOptionsOrientation] = useState(
    "options-list_vertical"
  );

  useEffect(() => {
    api.getBrandsAuto().then((res) => {
      setContentAuto(res.data);
    });
  }, []);

  const onBrandClick = (item: ICarInfo) => {
    switch (pageType) {
      case EPageType.BRANDS:
        api.getModelsAuto(item.id).then((res) => {
          setContentAuto(res.data);
          setPageType(EPageType.MODELS);
          setTitleAuto(item.name);
          setClassOptionsOrientation("options-list_horizontal");
        });
        break;
      case EPageType.MODELS:
        api.getModificationsAuto(item.id).then((res) => {
          setContentAuto(res.data);
          setPageType(EPageType.MODIFICATIONS);
          setTitlePage("Стеклоочистители для ");
          setTitleAuto(`${titleAuto} ${item.name}`);
        });
        break;
      case EPageType.MODIFICATIONS:
        api.getWipersParamsAuto(item.id).then((res) => {
          setPageType(EPageType.WIPERS);
          setContentWipers(res.data);
          setTitleModification(` ${item.name}`);
        });
    }
  };

  return (
    <section className="section-wipers">
      <h3 className="section-wipers__title title">
        {titlePage} <span className="title_red-text">{titleAuto}</span>
        <span className="title_thin-text">{titleModification}</span>
      </h3>
      {pageType === EPageType.WIPERS ? (
        contentWipers?.map((wiper: IWipersParams) => {
          return (
            <div
              key={uid()}
              className="section-wipers__options-list options-list options-list_vertical"
            >
              <p className="options-list__item">
                {wiperTitles.length1}
                {wiper.length1}
              </p>
              <p className="options-list__item">
                {wiperTitles.length2}
                {wiper.length2}
              </p>
              {wiper.length3 && (
                <p className="options-list__item">
                  {wiperTitles.length3}
                  {wiper.length3}
                </p>
              )}
              <p className="options-list__item">
                {wiperTitles.fasten}
                {wiper.fasten}
              </p>
            </div>
          );
        })
      ) : (
        <div
          className={`section-wipers__options-list options-list ${classOptionsOrientation}`}
        >
          {contentAuto?.map((item) => {
            return (
              <p
                key={item.id}
                className="options-list__item"
                onClick={() => onBrandClick(item)}
              >
                {item.name}
              </p>
            );
          })}
        </div>
      )}
    </section>
  );
};
