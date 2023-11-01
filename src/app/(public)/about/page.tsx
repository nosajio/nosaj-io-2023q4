import GithubIcon from '@/../public/ui/github_logo.svg?svgr';
import LinkedinIcon from '@/../public/ui/linkedin_logo.svg?svgr';
import RssIcon from '@/../public/ui/rss_logo.svg?svgr';
import XIcon from '@/../public/ui/x_logo.svg?svgr';
import Link from 'next/link';
import s from './AboutPage.module.scss';

const socials = [
  {
    id: 'x',
    name: 'X (aka Twitter)',
    url: 'https://x.com/nosajio',
    icon: <XIcon />,
  },
  {
    id: 'github',
    name: 'Github',
    url: 'https://github.com/nosajio',
    icon: <GithubIcon />,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nosajio',
    icon: <LinkedinIcon />,
  },
  {
    id: 'rss',
    name: 'RSS',
    url: 'https://nosaj.io/rss',
    icon: <RssIcon />,
  },
];

export default function AboutPage() {
  return (
    <div className={s.content_grid}>
      <aside className={s.sidebar}>
        <div className={s.picture} />
        {/* <Image
          className={s.picture}
          src="/ui/cybork_nosaj.png"
          alt="Jason"
          fill
        /> */}
        <ul className={s.socials}>
          {socials.map(soc => (
            <li key={soc.id}>
              <Link href={soc.url} target="_blank">
                {soc.icon}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <section className={s.content}>
        <h1 className={s.title}>Hello, I&apos;m Jason.</h1>
        <div className={s.content_section}>
          <p>
            You might know me online as @nosajio. I like to design and build
            software, start companies, and help other people do the same.
          </p>
        </div>

        <div className={s.content_section}>
          <h2 className={s.section_title}>Now</h2>
          <p>
            When I&apos;m not working on Sprinterview, I help startups and
            founders validate and build marketable software.
          </p>
        </div>

        <div className={s.content_section}>
          <h2 className={s.section_title}>Before</h2>
          <p>
            Before I decided to start my founder journey, I worked on the
            founding teams of startups like{' '}
            <Link target="_blank" href="https://pave.com">
              Pave (YC)
            </Link>
            ,{' '}
            <Link target="_blank" href="https://befrontier.com">
              Frontier (NFX)
            </Link>
            , and{' '}
            <Link href="https://www.tradespace.io/" target="_blank">
              Tradespace (500)
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
