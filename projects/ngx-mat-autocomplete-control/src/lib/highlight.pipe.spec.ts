import { HighlightPipe } from './highlight.pipe';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule]
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new HighlightPipe(sanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return text unchanged when search is empty', () => {
    const result = pipe.transform('Hello World', '', 'red');
    expect(result).toBe('Hello World');
  });

  it('should return text unchanged when search is null', () => {
    const result = pipe.transform('Hello World', null as any, 'red');
    expect(result).toBe('Hello World');
  });

  it('should return text unchanged when text is empty', () => {
    const result = pipe.transform('', 'search', 'red');
    expect(result).toBe('');
  });

  it('should return text unchanged when text is null', () => {
    const result = pipe.transform(null as any, 'search', 'red');
    expect(result).toBe(null as any);
  });

  it('should highlight matching text with the given color', () => {
    const result = pipe.transform('Hello World', 'World', 'red');
    // SafeHtml wraps the value; convert to string to inspect
    const html = (result as any).changingThisBreaksApplicationSecurity || result.toString();
    expect(html).toContain('<b style="color:red">World</b>');
    expect(html).toContain('Hello');
  });

  it('should highlight case-insensitively', () => {
    const result = pipe.transform('Hello World', 'hello', 'blue');
    const html = (result as any).changingThisBreaksApplicationSecurity || result.toString();
    expect(html).toContain('<b style="color:blue">Hello</b>');
  });

  it('should highlight multiple occurrences', () => {
    const result = pipe.transform('apple and apple pie', 'apple', 'green');
    const html = (result as any).changingThisBreaksApplicationSecurity || result.toString();
    const matches = html.match(/<b style="color:green">apple<\/b>/gi);
    expect(matches?.length).toBe(2);
  });

  it('should highlight multiple words separated by spaces', () => {
    const result = pipe.transform('The quick brown fox', 'quick fox', '#333');
    const html = (result as any).changingThisBreaksApplicationSecurity || result.toString();
    expect(html).toContain('<b style="color:#333">quick</b>');
    expect(html).toContain('<b style="color:#333">fox</b>');
  });

  it('should ignore extra spaces in search term', () => {
    const result = pipe.transform('Hello World', '  Hello  ', 'red');
    const html = (result as any).changingThisBreaksApplicationSecurity || result.toString();
    expect(html).toContain('<b style="color:red">Hello</b>');
  });

  it('should escape regex special characters in search term', () => {
    const result = pipe.transform('price is $100 (USD)', '$100', 'orange');
    const html = (result as any).changingThisBreaksApplicationSecurity || result.toString();
    expect(html).toContain('<b style="color:orange">$100</b>');
  });
});
