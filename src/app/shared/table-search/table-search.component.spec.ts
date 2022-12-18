import { TableSearchComponent } from './../table-search/table-search.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('TableSearchComponent', () => {
  let component: TableSearchComponent;
  let fixture: ComponentFixture<TableSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
