import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ISearchable } from '../interfaces/ISearchable';

@Pipe({
  name: 'searchPipe',
  pure:true
})

export class SearchPipe implements PipeTransform{
    
    transform(originalRecords: Observable<ISearchable[]>, searchTerm:string): Observable<any[]> {

        return (originalRecords).pipe(
            map(originalRecordsArray => {
              // if filter is empty return all records
              if (!searchTerm) {
                return originalRecordsArray;
              }
          
              // search for specific record
              const filteredRecords: ISearchable[] = [];
          
              originalRecordsArray.filter(function(record: ISearchable) {
               
                if (record.searchProperty.toLowerCase().includes(searchTerm.toLowerCase())) {
                    filteredRecords.push(record);
                }
              });
          
              return filteredRecords;
            })
          );
    }
}