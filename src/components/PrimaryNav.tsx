import Image from "next/image";
import Link from "next/link";
import PrimaryNavStatic from "@/components/PrimaryNavStatic";
import type { MenuCard, MenuFeaturedBlog, MenuTab, MenuTopLevel } from "@/lib/wordpress";

/**
 * Shared primary navigation, rendered by both Header (desktop) and MobileMenu
 * (off-canvas), from the WordPress menu returned by `fetchMenu()`.
 *
 * This component does not fetch. MobileMenu is a client component, and a client
 * component cannot render an async server component, so both callers fetch on the
 * server and hand the tree down as a prop.
 *
 * `items` of null means WordPress could not be reached or returned nothing usable;
 * the nav appears on every page, so that degrades to the pre-CMS snapshot in
 * PrimaryNavStatic rather than to an empty header.
 *
 * idSuffix keeps panel/tab ids unique between the two renders; withBack adds the
 * mobile submenu "Back" buttons.
 */
export default function PrimaryNav({
  items,
  idSuffix = "",
  withBack = false,
}: {
  items?: MenuTopLevel[] | null;
  idSuffix?: string;
  withBack?: boolean;
}) {
  if (!items?.length) return <PrimaryNavStatic idSuffix={idSuffix} withBack={withBack} />;

  return (
    <>
      {items.map((item) =>
        item.children.length ? (
          <MegaItem key={item.id} item={item} idSuffix={idSuffix} withBack={withBack} />
        ) : (
          <li key={item.id} className="dbh-nav__item">
            <Link className="dbh-nav__link" href={item.url} {...targetProps(item.target)}>
              {item.title}
            </Link>
          </li>
        )
      )}
    </>
  );
}

function MegaItem({
  item,
  idSuffix,
  withBack,
}: {
  item: MenuTopLevel;
  idSuffix: string;
  withBack: boolean;
}) {
  const panelId = `mm-panel-${item.id}${idSuffix}`;

  return (
    <li className="dbh-nav__item has-mega-menu">
      <Link
        className="dbh-nav__link"
        href={item.url}
        aria-haspopup="true"
        aria-expanded="false"
        aria-controls={panelId}
      >
        {item.title}
        <span className="dbh-nav__caret" aria-hidden="true"></span>
      </Link>
      <div className="dbh-mega-panel" role="region" aria-hidden="true" id={panelId}>
        <div className="dbh-mega-panel__inner">
          {withBack && (
            <button type="button" className="dbh-megaback" aria-label="Back">
              <svg width={18} height={18} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M12 4L6 10L12 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              Back
            </button>
          )}
          <div className="dbh-mega-sidebar">
            {/* The first tab is the one that opens. WordPress marks it with a
                `dbh-first-child` class, but that class is injected at render time and
                never reaches the REST payload — and every panel WordPress renders opens
                on its first tab anyway, so position is the more reliable signal. */}
            {item.children.map((tab, i) => (
              <button
                key={tab.id}
                className={`dbh-mega-tab${i === 0 ? " is-active" : ""}`}
                data-tab={`mega-group-${tab.id}${idSuffix}`}
                type="button"
                role="tab"
                aria-selected={i === 0}
                aria-controls={`mega-group-${tab.id}${idSuffix}`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="dbh-mega-panel-body">
            {item.children.map((tab, i) => (
              <TabPanel key={tab.id} tab={tab} active={i === 0} idSuffix={idSuffix} />
            ))}
          </div>
          {/* The sidebar belongs to the top-level item but is revealed per tab by
              `.dbh-mega-panel__inner:has(.dbh-mega-content.is-active[data-show-blogs="1"])`,
              so a panel whose tabs all leave the toggle off renders nothing visible.
              Skip the markup entirely in that case rather than shipping hidden
              images on every page. */}
          {item.featuredBlogs.length > 0 && item.children.some((tab) => tab.showSidebar) && (
            <div className="dbh-mega-blogs">
              <p className="dbh-mega-blogs__heading">Featured Blogs</p>
              {item.featuredBlogs.map((blog) => (
                <FeaturedBlog key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function TabPanel({ tab, active, idSuffix }: { tab: MenuTab; active: boolean; idSuffix: string }) {
  return (
    <div
      className={`dbh-mega-content${active ? " is-active" : ""} dbh-mega-content--${tab.cardStyle}`}
      id={`mega-group-${tab.id}${idSuffix}`}
      role="tabpanel"
      aria-hidden={!active}
      // Only ever emitted as "1": the CSS matches on that exact value, so absence
      // and "0" mean the same thing and the shorter attribute keeps the markup
      // identical to what the site shipped before.
      {...(tab.showSidebar ? { "data-show-blogs": "1" } : {})}
    >
      {tab.sectionHeading && (
        <h3 className="dbh-mega-content__heading">{tab.sectionHeading}</h3>
      )}
      <div className={`dbh-mega-cards dbh-mega-cards--${tab.cardStyle}`}>
        {tab.cardStyle === "columns" ? (
          toColumns(tab.children).map((column, i) => (
            <div key={i} className="dbh-mega-col">
              {/* Editors mark an unlabelled column with a bare `&nbsp;` heading, which
                  decodes to "". Put the non-breaking space back rather than emitting an
                  empty <p>: the heading needs a line box, or the column's first link
                  rides up out of line with its neighbours. */}
              <p className="dbh-mega-col__heading">{column.heading || " "}</p>
              {column.cards.map((card) => (
                <Card key={card.id} card={card} />
              ))}
            </div>
          ))
        ) : (
          tab.children.map((card) => <Card key={card.id} card={card} />)
        )}
      </div>
    </div>
  );
}

/**
 * Split a column list at every card flagged `startsColumn`. Cards appearing before
 * the first flag still need a home, so they open an unlabelled column.
 */
function toColumns(cards: MenuCard[]): Array<{ heading: string; cards: MenuCard[] }> {
  const columns: Array<{ heading: string; cards: MenuCard[] }> = [];
  for (const card of cards) {
    if (card.startsColumn || columns.length === 0) {
      columns.push({ heading: card.startsColumn ? card.columnHeading : "", cards: [] });
    }
    columns[columns.length - 1].cards.push(card);
  }
  return columns;
}

function Card({ card }: { card: MenuCard }) {
  return (
    <Link
      className={`dbh-mega-card${card.cardImage ? " dbh-mega-card--image" : ""}`}
      href={card.url}
      {...targetProps(card.target)}
    >
      {card.cardImage && (
        <div className="dbh-mega-card__img-wrap">
          <Image
            src={card.cardImage.url}
            alt={card.cardImage.alt}
            width={card.cardImage.width || 280}
            height={card.cardImage.height || 180}
          />
        </div>
      )}
      <div className="dbh-mega-card__body">
        <span className="dbh-mega-card__title">{card.title}</span>
        {card.cardExcerpt && (
          <span className="dbh-mega-card__excerpt">{card.cardExcerpt}</span>
        )}
        <span className="dbh-mega-card__arrow" aria-hidden="true"></span>
      </div>
    </Link>
  );
}

function FeaturedBlog({ blog }: { blog: MenuFeaturedBlog }) {
  return (
    <Link className="dbh-mega-blog-item" href={blog.href}>
      {blog.image.url && (
        <div className="dbh-mega-blog-item__thumb">
          <Image src={blog.image.url} alt={blog.title} width={80} height={60} />
        </div>
      )}
      <div className="dbh-mega-blog-item__text">
        <span className="dbh-mega-blog-item__title">{blog.title}</span>
        <span className="dbh-mega-blog-item__arrow" aria-hidden="true"></span>
      </div>
    </Link>
  );
}

// WordPress stores "" for same-tab links; only emit the attributes when it does not.
const targetProps = (target: string) =>
  target ? { target, rel: target === "_blank" ? "noopener noreferrer" : undefined } : {};
